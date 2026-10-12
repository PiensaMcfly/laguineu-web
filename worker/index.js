import * as login from '../functions/api/login.js';
import * as logout from '../functions/api/logout.js';
import * as session from '../functions/api/session.js';
import * as publish from '../functions/api/publish.js';
import * as versions from '../functions/api/versions.js';
import * as images from '../functions/api/images.js';
import * as reviews from '../functions/api/reviews.js';
import { json } from '../functions/_lib/auth.js';

const routes = {
  '/api/login': login,
  '/api/logout': logout,
  '/api/session': session,
  '/api/publish': publish,
  '/api/versions': versions,
  '/api/images': images,
  '/api/reviews': reviews
};
const HANDLER_BY_METHOD = { GET: 'onRequestGet', POST: 'onRequestPost' };

export default {
  async fetch(request, env, ctx) {
    const route = routes[new URL(request.url).pathname];
    if (!route) return json({ error: 'No encontrado' }, 404);
    const handler = route[HANDLER_BY_METHOD[request.method]];
    if (!handler) return json({ error: 'Método no permitido' }, 405);
    return handler({ request, env, ctx });
  }
};
