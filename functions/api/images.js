import { json, requireAuth } from '../_lib/auth.js';
import { github, githubConfigured, ghFail, GhError } from '../_lib/github.js';

const EXT = /\.(jpe?g|png|webp|gif|jfif)$/i;

async function list(gh, dir, prefix) {
  try {
    const items = await (await gh.call('/contents/site/Public/Images' + dir + '?ref=' + encodeURIComponent(gh.branch))).json();
    return items.filter((i) => i.type === 'file' && EXT.test(i.name)).map((i) => prefix + i.name);
  } catch (e) {
    if (e instanceof GhError && e.status === 404) return [];
    throw e;
  }
}

export async function onRequestGet({ request, env }) {
  const denied = await requireAuth(request, env);
  if (denied) return denied;
  if (!githubConfigured(env)) return json({ error: 'Falta configurar GITHUB_TOKEN y GITHUB_REPO en Cloudflare.' }, 503);
  const gh = github(env);
  try {
    const [base, uploads] = await Promise.all([list(gh, '', ''), list(gh, '/uploads', 'uploads/')]);
    return json({ images: [...base, ...uploads] });
  } catch (e) {
    return ghFail(e);
  }
}
