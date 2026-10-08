import { json } from './auth.js';

export class GhError extends Error {
  constructor(status, detail) {
    super('GitHub ' + status);
    this.status = status;
    this.detail = detail;
  }
}

export const githubConfigured = (env) => !!(env.GITHUB_TOKEN && env.GITHUB_REPO);

export function github(env) {
  const branch = env.GITHUB_BRANCH || 'main';
  const base = {
    Authorization: 'Bearer ' + env.GITHUB_TOKEN,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'laguineu-admin'
  };
  async function call(path, init = {}) {
    const res = await fetch('https://api.github.com/repos/' + env.GITHUB_REPO + path, {
      ...init,
      headers: { ...base, ...(init.body ? { 'Content-Type': 'application/json' } : {}), ...(init.headers || {}) }
    });
    if (!res.ok) throw new GhError(res.status, (await res.text()).slice(0, 300));
    return res;
  }
  return { branch, call };
}

export function ghFail(e) {
  if (!(e instanceof GhError)) return json({ error: 'Error inesperado en el servidor.' }, 500);
  if (e.status === 401 || e.status === 403) return json({ error: 'El servidor no tiene permiso en GitHub. Revisá el token (GITHUB_TOKEN).' }, 502);
  if (e.status === 404) return json({ error: 'No encuentro el repositorio en GitHub. Revisá GITHUB_REPO y el permiso del token.' }, 502);
  if (e.status === 409 || e.status === 422) return json({ error: 'Se guardó otro cambio al mismo tiempo. Probá publicar de nuevo.' }, 409);
  return json({ error: 'GitHub respondió con un error (' + e.status + ').' }, 502);
}
