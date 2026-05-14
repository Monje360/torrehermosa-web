# Pastelería Torrehermosa — Campaña Social Media

12 carruseles para Instagram (1080×1350 px, formato 4:5) con la misma identidad
visual de la web: tipografías Cormorant Garamond + Inter, paleta cream/ink/gold,
fotos reales del producto.

## Estructura

| # | Archivo | Tema |
|---|---------|------|
| 01 | `brand-1-historia.html` | 60+ años de oficio, 3 generaciones |
| 02 | `brand-2-medalla.html` | Medalla de oro · Mejor tarta de Madrid |
| 03 | `brand-3-especialidades.html` | El obrador y sus especialidades |
| 04 | `producto-1-suspiro.html` | La Tarta Suspiro y sus 7 sabores |
| 05 | `producto-2-brioche.html` | Brioches rellenos |
| 06 | `producto-3-tarta-boda.html` | Tartas de boda |
| 07 | `producto-4-tarta-cumple.html` | Tartas de cumpleaños |
| 08 | `producto-5-catering.html` | Catering para eventos |
| 09 | `producto-6-temporada.html` | Productos de temporada |
| 10 | `distrib-1-oportunidad.html` | B2B · Sé punto de venta |
| 11 | `distrib-2-por-que.html` | B2B · Por qué Torrehermosa |
| 12 | `distrib-3-como-trabajar.html` | B2B · Cómo trabajar con nosotros |

## Cómo previsualizar

Abre `index.html` en el navegador (también accesible desde la web desplegada en
Vercel: `/social/`). Verás un launcher con links a los 12 carruseles.

## Cómo exportar a PNG (para subir a Instagram)

1. Abre cualquier carrusel
2. Pasa el ratón por encima de una slide → aparece un botón dorado **`↓ Slide N`**
3. Click para descargar esa slide como PNG a **1080×1350 px** (formato Instagram 4:5)
4. O usa el botón **`↓ Descargar todas`** arriba para bajar todas las slides del carrusel seguidas (con un pequeño retraso entre cada una para que el navegador no las bloquee)

Los PNGs se descargan con nombre semántico: `historia-01.png`, `historia-02.png`, etc.

## Cómo subir a Instagram

1. En la app de Instagram, crea un nuevo **post múltiple** (carrusel)
2. Selecciona las imágenes del carrusel en orden (01, 02, 03…)
3. Publica como carrusel

## Identidad visual

- **Tipografías**: Cormorant Garamond (titulares, italic) + Inter (UI/texto)
- **Paleta**:
  - Cream `#FAF6F0` (fondo claro)
  - Ink `#1A1714` (fondo oscuro / tinta)
  - Gold `#B08D57` + Gold soft `#D4B98E` (acento)
  - Blush `#E8C9C5` (toque rosado)
- **Datos de contacto en cada carrusel**:
  - WhatsApp: +34 636 216 585
  - Tienda: +34 915 535 799
  - Dirección: Valle de Esteríbar, 2 · CC El Castillo · Villafranca del Castillo, Madrid
  - Handle: @pasteleriatorrehermosa
  - Web: pasteleriatorrehermosa.com

## Personalización

- **Cambiar handle de Instagram**: busca `@pasteleriatorrehermosa` en los HTML
- **Cambiar copy de una slide**: edita el HTML directamente, los textos están
  en las etiquetas `<h1>`, `<h2>`, `<p>`, `<span class="eyebrow">`, etc.
- **Sustituir foto**: cambia el `background-image:url(...)` por otra ruta del folder `../img/`

## Print-to-PDF (alternativa)

Cada HTML tiene CSS de impresión configurado para que **cada slide salga en su
propia página** a 1080×1350 px. Si prefieres exportar todo de una vez:

1. Abre el carrusel en Chrome
2. `⌘ + P` (Imprimir)
3. Destino: **Guardar como PDF**
4. Tamaño de papel: personalizado 1080 × 1350 px
5. Márgenes: ninguno
6. Guardar

Luego abre el PDF en Preview de macOS y exporta cada página como PNG.
