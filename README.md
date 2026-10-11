# Camping La Guineu: sitio web + editor visual

Landing page del Camping La Guineu (Malargüe, Mendoza) con un editor visual para que el cliente la mantenga actualizada solo, sin saber programación.

## Qué hace

- **La página pública** está en la carpeta `site/`.
- **El editor** vive en `/admin`, protegido con contraseña. Permite cambiar textos, fotos, colores y tipografías, agregar secciones ya armadas (carruseles, galerías, tarifas, promociones, preguntas frecuentes…) y mostrar videos de YouTube.
- **Al tocar Publicar**, los cambios se guardan en este repositorio y la página se actualiza sola en 1 o 2 minutos. Cada publicación queda en el historial y se puede volver a una versión anterior.

## Cómo funciona

1. El editor carga la página y el cliente la modifica en su navegador. Las fotos nuevas se convierten solas a WebP y se achican.
2. Al publicar, un servidor chico (`functions/`, que corre en Cloudflare Workers) valida el contenido y hace **un solo commit** en GitHub con la página, los datos del editor y las imágenes nuevas.
3. Cloudflare detecta el commit y publica la nueva versión. No hay base de datos.
4. La contraseña, la clave de sesión y el token de GitHub se guardan solo en Cloudflare, nunca en el repositorio.

## Documentación

- [`docs/Guia-del-editor-para-el-cliente.pdf`](docs/Guia-del-editor-para-el-cliente.pdf): guía paso a paso para quien edita la página.

