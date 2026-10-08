import { json, requireAuth, sameOrigin, readJson } from '../_lib/auth.js';
import { github, githubConfigured, ghFail } from '../_lib/github.js';
import { htmlProblems, decodeBase64Utf8 } from '../_lib/htmlcheck.js';

const MAX_HTML_B64 = 1400000;
const SITE_DIR = 'site';
const MAX_FILES = 20;
const MAX_TEXT_B64 = 4000000;
const MAX_IMAGE_B64 = 2800000;
const MAX_IMAGES_TOTAL_B64 = 10000000;
const MAX_BODY = 20000000;
const IMAGE_PATH = /^Public\/Images\/uploads\/[a-f0-9]{12}\.(webp|jpg|png|gif)$/;

const looksBase64 = (s, max) => typeof s === 'string' && s.length >= 20 && s.length <= max;

function startsWith(b64, text) {
  try {
    return atob(b64.slice(0, Math.ceil((text.length * 4) / 3 / 4) * 4)).startsWith(text);
  } catch {
    return false;
  }
}

function isImage(ext, b64) {
  let head;
  try {
    head = atob(b64.slice(0, 16));
  } catch {
    return false;
  }
  if (ext === 'webp') return head.startsWith('RIFF') && head.slice(8, 12) === 'WEBP';
  if (ext === 'jpg') return head.charCodeAt(0) === 0xff && head.charCodeAt(1) === 0xd8 && head.charCodeAt(2) === 0xff;
  if (ext === 'png') return head.charCodeAt(0) === 0x89 && head.slice(1, 4) === 'PNG';
  if (ext === 'gif') return head.startsWith('GIF8');
  return false;
}

export async function onRequestPost({ request, env }) {
  if (!sameOrigin(request)) return json({ error: 'Solicitud no permitida' }, 403);
  const denied = await requireAuth(request, env);
  if (denied) return denied;
  if (!githubConfigured(env)) return json({ error: 'Falta configurar GITHUB_TOKEN y GITHUB_REPO en Cloudflare.' }, 503);
  if (!(request.headers.get('Content-Type') || '').startsWith('application/json')) return json({ error: 'Formato inválido' }, 415);

  const parsed = await readJson(request, MAX_BODY);
  if (parsed.error === 'too_large') return json({ error: 'La publicación es demasiado pesada. Probá con menos imágenes nuevas.' }, 413);
  if (!parsed.data || typeof parsed.data !== 'object') return json({ error: 'Solicitud inválida' }, 400);
  const { html, project, files = [], message } = parsed.data;

  if (!looksBase64(html, MAX_HTML_B64) || !startsWith(html, '<!DOCTYPE html>')) return json({ error: 'La página no es válida o es demasiado grande.' }, 400);
  let problem;
  try {
    problem = htmlProblems(decodeBase64Utf8(html));
  } catch {
    problem = 'La página no se pudo leer.';
  }
  if (problem) return json({ error: problem }, 400);
  if (project !== undefined && (!looksBase64(project, MAX_TEXT_B64) || !startsWith(project, '{'))) return json({ error: 'Los datos del editor no son válidos.' }, 400);
  if (!Array.isArray(files) || files.length > MAX_FILES) return json({ error: 'Demasiadas imágenes nuevas en una sola publicación (máximo ' + MAX_FILES + ').' }, 400);

  const entries = [{ path: SITE_DIR + '/index.html', content: html }];
  if (project) entries.push({ path: SITE_DIR + '/data/project.json', content: project });
  const seen = new Set();
  let imagesTotal = 0;
  for (const f of files) {
    const m = f && typeof f.path === 'string' && f.path.match(IMAGE_PATH);
    if (!m) return json({ error: 'Ruta de imagen no permitida.' }, 400);
    if (!looksBase64(f.content, MAX_IMAGE_B64)) return json({ error: 'Una imagen es demasiado grande (máximo 2 MB).' }, 400);
    if (!isImage(m[1], f.content)) return json({ error: 'Un archivo no es una imagen válida.' }, 400);
    if (seen.has(f.path)) continue;
    imagesTotal += f.content.length;
    if (imagesTotal > MAX_IMAGES_TOTAL_B64) return json({ error: 'Las imágenes nuevas pesan demasiado en total. Publicá en dos veces.' }, 413);
    seen.add(f.path);
    entries.push({ path: SITE_DIR + '/' + f.path, content: f.content });
  }

  const gh = github(env);
  try {
    const ref = await (await gh.call('/git/ref/heads/' + gh.branch)).json();
    const parentSha = ref.object.sha;
    const parent = await (await gh.call('/git/commits/' + parentSha)).json();
    const tree = await Promise.all(
      entries.map(async (e) => {
        const blob = await (await gh.call('/git/blobs', { method: 'POST', body: JSON.stringify({ content: e.content, encoding: 'base64' }) })).json();
        return { path: e.path, mode: '100644', type: 'blob', sha: blob.sha };
      })
    );
    const newTree = await (await gh.call('/git/trees', { method: 'POST', body: JSON.stringify({ base_tree: parent.tree.sha, tree }) })).json();
    const note = String(message || '').replace(/[\r\n]+/g, ' ').trim().slice(0, 80) || 'cambios en el sitio';
    const who = { name: 'Editor del sitio', email: 'editor@users.noreply.github.com', date: new Date().toISOString() };
    const commit = await (
      await gh.call('/git/commits', {
        method: 'POST',
        body: JSON.stringify({ message: 'Editor: ' + note, tree: newTree.sha, parents: [parentSha], author: who, committer: who })
      })
    ).json();
    await gh.call('/git/refs/heads/' + gh.branch, { method: 'PATCH', body: JSON.stringify({ sha: commit.sha }) });
    return json({ ok: true, commit: commit.sha, files: entries.length });
  } catch (e) {
    return ghFail(e);
  }
}
