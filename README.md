# Aurun — Landing de captación

Landing page de conversión para **Aurun** (IA aplicada, paid media y transformación digital para PYMEs).

Recibe tráfico de publicidad, captura leads mediante el formulario y dispara el evento de conversión del pixel de Meta. El equipo contacta al lead para agendar una reunión.

## Stack
- HTML + CSS + JavaScript estáticos (sin build).
- Meta Pixel (`PageView` + `Lead`).

## Estructura
- `index.html` — página completa.
- `styles.css` — estilos.
- `script.js` — validación del formulario y evento `Lead`.

## Pendientes de configuración
1. **Meta Pixel:** reemplazar `TU_PIXEL_ID` en `index.html` (aparece 3 veces) por el ID real.
2. **Destino del formulario:** hoy el envío solo hace `console.log`. Conectar a un backend / webhook (n8n) / CRM en el `// TODO` de `script.js`.

## Deploy
Sitio estático — se despliega directo en Vercel (framework preset: *Other*, sin build command).
