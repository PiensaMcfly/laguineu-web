import { json, requireAuth } from '../_lib/auth.js';
import { github, githubConfigured, ghFail, GhError } from '../_lib/github.js';

const SHA = /^[0-9a-f]{40}$/;

export async function onRequestGet({ request, env }) {
  const denied = await requireAuth(request, env);
  if (denied) return denied;
  if (!githubConfigured(env)) return json({ error: 'Falta configurar GITHUB_TOKEN y GITHUB_REPO en Cloudflare.' }, 503);

  const url = new URL(request.url);
  const sha = url.searchParams.get('sha');
  const gh = github(env);
  try {
    if (sha) {
      if (!SHA.test(sha)) return json({ error: 'Versión inválida' }, 400);
      const file = url.searchParams.get('file') === 'html' ? 'index.html' : 'data/project.json';
      const res = await gh.call('/contents/site/' + file + '?ref=' + sha, { headers: { Accept: 'application/vnd.github.raw+json' } });
      return new Response(await res.text(), { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } });
    }
    const list = await (await gh.call('/commits?sha=' + encodeURIComponent(gh.branch) + '&path=site/index.html&per_page=25')).json();
    return json({
      versions: list.map((c) => ({ sha: c.sha, date: c.commit.author.date, message: c.commit.message.split('\n')[0].slice(0, 100) }))
    });
  } catch (e) {
    if (sha && e instanceof GhError && e.status === 404) return json({ missing: true }, 404);
    return ghFail(e);
  }
}
