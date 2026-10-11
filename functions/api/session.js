import { json, isAuthenticated, configured, configProblems } from '../_lib/auth.js';

export async function onRequestGet({ request, env }) {
  if (await isAuthenticated(request, env)) return json({ ok: true });
  return json({ error: 'No autorizado', configured: configured(env), problems: configProblems(env) }, 401);
}
