#!/bin/bash
# Generate the corporate presentation PDF (16:9, 1920x1080 per page)
# using headless Chrome's --print-to-pdf.

set -e

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INPUT="$DIR/index.html"
OUTPUT="$HOME/Desktop/Torrehermosa-TartaSuspiro-Distribucion.pdf"

if [ ! -x "$CHROME" ]; then
  echo "Google Chrome no encontrado en $CHROME"
  exit 1
fi

echo "→ Generando PDF desde $INPUT"

"$CHROME" \
  --headless=new \
  --disable-gpu \
  --no-sandbox \
  --hide-scrollbars \
  --no-pdf-header-footer \
  --print-to-pdf-no-header \
  --virtual-time-budget=4000 \
  --print-to-pdf="$OUTPUT" \
  "file://${INPUT}" >/dev/null 2>&1 || true

if [ -f "$OUTPUT" ]; then
  size=$(stat -f%z "$OUTPUT")
  size_kb=$((size / 1024))
  echo "✓ PDF generado: $OUTPUT"
  echo "  Tamaño: ${size_kb} KB"
else
  echo "✗ Falló la generación del PDF"
  exit 1
fi
