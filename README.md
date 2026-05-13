# Pastelería Torrehermosa — Web

Web institucional + catálogo de productos con CTA a WhatsApp.
Construida con HTML, CSS y JS puros — sin frameworks, sin build, sin dependencias.

## Estructura

```
torrehermosa-web/
├── index.html        # Página única con todas las secciones
├── styles.css        # Sistema de diseño completo
├── script.js         # Animaciones de scroll y nav
├── img/              # Imágenes (ver img/README.txt)
└── README.md
```

## Cómo verla

Doble clic en `index.html` o sirve la carpeta con cualquier servidor estático:

```bash
# Opción 1: Python
python3 -m http.server 8000

# Opción 2: Node
npx serve .

# Opción 3: VSCode → extensión Live Server
```

Luego abre http://localhost:8000

## Cómo desplegarla

Súbela a cualquiera de estos (todos gratis):

- **Netlify**: arrastra la carpeta a https://app.netlify.com/drop
- **Vercel**: `vercel` desde la carpeta
- **GitHub Pages**: sube a un repo y activa Pages en Settings
- **Tu hosting actual**: sube los archivos por FTP

## Personalización rápida

| Qué cambiar         | Dónde                                    |
|---------------------|------------------------------------------|
| Textos              | `index.html`                             |
| Colores             | `styles.css` → bloque `:root`            |
| Tipografía          | `index.html` (link Google Fonts) + CSS   |
| Teléfono / WhatsApp | Busca `915535799` en `index.html`        |
| Email               | Busca `info@pasteleriastorrehermosa.com` |
| Horarios            | Sección `.visit__info` en `index.html`   |

## Siguiente paso

1. Coloca las 4 fotos de producto en `img/` (ver `img/README.txt`).
2. Reemplaza el número de WhatsApp por uno real si el teléfono actual es solo fijo.
3. Pídeme que añada secciones extra: galería, blog, FAQ, formulario de contacto, etc.
