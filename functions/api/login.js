import { json, checkPassword, createSessionCookie, configured, sameOrigin, readJson } from '../_lib/auth.js';
import { isBlocked, recordFail, clearFails } from '../_lib/ratelimit.js';

export async function onRequestPost({ request, env }) {
  if (!configured(env)) {
    return json({ error: 'El servidor todavía no está configurado (la contraseña debe tener 12 caracteres o más y la clave interna 32 o más).' }, 503);
  }
  if (!sameOrigin(request)) return json({ error: 'Solicitud no permitida' }, 403);
  if (await isBlocked(env, request)) return json({ error: 'Demasiados intentos. Esperá 15 minutos e intentá de nuevo.' }, 429);

  const parsed = await readJson(request, 2000);
  const password = parsed.data && parsed.data.password;
  if (typeof password !== 'string' || password.length > 200) return json({ error: 'Solicitud inválida' }, 400);

  if (!(await checkPassword(password, env))) {
    await recordFail(env, request);
    await new Promise((r) => setTimeout(r, 800));
    return json({ error: 'Contraseña incorrecta' }, 401);
  }
  await clearFails(env, request);
  return json({ ok: true }, 200, { 'Set-Cookie': await createSessionCookie(env) });
}
