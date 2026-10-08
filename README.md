# Camping La Guineu: sitio web + editor visual

Landing page del camping con un editor visual en `/admin` para que el cliente cambie textos, fotos, colores, tipografías y secciones sin tocar código. Se publica en **Cloudflare Pages** (gratis) y cada cambio queda guardado en este repositorio, con historial para volver atrás.

## Cómo funciona

- `site/` es lo que se publica: la landing (`index.html`), el editor (`admin/`), las imágenes (`Public/`) y los scripts propios (`Src/`, `vendor/`).
- `functions/` es el servidor (Cloudflare Pages Functions): login, publicar, versiones e imágenes.
- Cuando el cliente toca **Publicar**, el servidor guarda la página, los datos del editor y las imágenes nuevas en un solo commit. Cloudflare detecta el commit y actualiza el sitio en 1 o 2 minutos.
- El token de GitHub y la contraseña viven solo en Cloudflare (variables secretas), nunca en este repo ni en el navegador.

## Puesta en marcha (unos 20 minutos)

Los nombres de los botones de Cloudflare pueden variar un poco; la idea es la misma.

### 1. Token de GitHub (para que el editor pueda guardar)

1. Entrá a https://github.com/settings/personal-access-tokens/new
2. Nombre: `Editor La Guineu`. Vencimiento: 1 año (anotá la fecha para renovarlo).
3. En **Repository access** elegí **Only select repositories** y marcá solo `laguineu-web`.
4. En **Permissions → Repository permissions** poné **Contents: Read and write** (Metadata queda en solo lectura, es automático).
5. **Generate token** y copialo (solo se muestra una vez).

### 2. Cloudflare Pages

1. Creá una cuenta gratis en https://dash.cloudflare.com/sign-up
2. **Workers & Pages → Create → Pages → Import an existing Git repository** y autorizá GitHub para el repo `laguineu-web`.
3. Configuración de build:
   - Framework preset: **None**
   - Build command: *(vacío)*
   - Build output directory: **`site`**
4. **Save and Deploy**. La primera vez el login todavía no va a andar, falta el paso siguiente.

### 3. Variables (Settings → Variables and secrets → Production)

| Nombre | Valor | Tipo |
|---|---|---|
| `ADMIN_PASSWORD` | Contraseña del cliente, **12 caracteres o más** (mejor una frase larga) | Secret |
| `SESSION_SECRET` | Texto al azar de **32 caracteres o más** (ver abajo) | Secret |
| `GITHUB_TOKEN` | El token del paso 1 | Secret |
| `GITHUB_REPO` | `PiensaMcfly/laguineu-web` | Texto |
| `GITHUB_BRANCH` | `main` | Texto |

Para generar `SESSION_SECRET` en PowerShell:

```powershell
$b = New-Object byte[] 36; [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($b); [Convert]::ToBase64String($b)
```

Después de guardar las variables hay que **volver a desplegar** (Deployments → los tres puntos del último → Retry deployment), porque las variables solo se aplican a despliegues nuevos.

### 4. Probar

- `https://TU-PROYECTO.pages.dev/` debe mostrar la landing.
- `https://TU-PROYECTO.pages.dev/admin/` pide la contraseña y abre el editor.
- Hacé un cambio chico, tocá **Publicar** y en 1 o 2 minutos debería verse en la landing.

### 5. Recomendado: esconder el editor con Cloudflare Access (gratis hasta 50 usuarios)

1. **Zero Trust → Access → Applications → Add an application → Self-hosted**.
2. Dominio de tu sitio, con las rutas `/admin` y `/api`.
3. Política **Allow** solo para los emails del cliente y el tuyo (entran con un código por mail).

Con esto, nadie ve ni la pantalla de login. La contraseña queda como segunda barrera.

### 6. Opcional: bloqueo por intentos fallidos

- Creá un KV en **Workers & Pages → KV** y asocialo al proyecto en **Settings → Bindings → KV namespace** con el nombre de variable `RATE`.
- Con eso, después de 5 contraseñas incorrectas seguidas desde la misma IP, el login se bloquea 15 minutos.
- Además podés crear una regla de límite de pedidos (WAF → Rate limiting rules) sobre `/api/login`.

### 7. Dominio .com.ar

1. El cliente lo registra en https://nic.ar (CUIT/CUIL, clave fiscal y tarjeta; el costo lo confirma NIC).
2. En Cloudflare: **Add a site** con el dominio, plan Free. Te da dos *nameservers*.
3. En NIC: **Delegar** el dominio y cargá esos dos nameservers (puede tardar hasta 24 o 48 horas).
4. En el proyecto de Pages: **Custom domains → Set up a domain** y listo; el certificado HTTPS es automático.

## Uso del cliente

1. Entrar a `tudominio.com.ar/admin`, con la contraseña.
2. Hacer clic en cualquier texto, imagen o sección para editarla desde el panel **Rápido**.
3. **+ Agregar sección** para sumar carruseles, galerías, tarifas, promociones, etc.
4. **Publicar** cuando esté listo. **Versiones** permite volver a una versión anterior.
5. Las imágenes se convierten solas a WebP y se achican antes de subirse.

## Mantenimiento

- **Cambiar la contraseña:** editá `ADMIN_PASSWORD` en Cloudflare y volvé a desplegar.
- **Cerrar todas las sesiones:** cambiá `SESSION_SECRET` y volvé a desplegar.
- **Renovar el token:** antes del vencimiento, creá uno nuevo (paso 1) y reemplazá `GITHUB_TOKEN`.
- Las notas de "¿Qué cambiaste?" quedan en el historial público del repo: no escribir datos sensibles.

## Seguridad

- No hay base de datos, por lo que no hay inyección SQL.
- Política de seguridad de contenido: la página pública solo ejecuta scripts propios (Tailwind está guardado en `site/vendor/`).
- Login con cookie `HttpOnly`/`Secure`/`SameSite=Strict`, verificación de origen en cada pedido y bloqueo por intentos (con KV).
- El servidor solo puede escribir `site/index.html`, `site/data/project.json` e imágenes en `site/Public/Images/uploads/`; nunca el código. Además rechaza páginas con scripts, atributos de eventos, formularios o marcos de sitios no permitidos.
- Las librerías de terceros del editor se verifican por integridad (SRI).

## Pendiente a futuro

- Compilar Tailwind en vez de calcularlo en el navegador (carga más rápido).
- Subida de videos propios (hoy se pega un link de YouTube o un archivo .mp4 alojado afuera).
