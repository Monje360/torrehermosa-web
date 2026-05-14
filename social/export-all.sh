#!/bin/bash
# Export every slide of every carousel to PNG (1080×1350) using headless Chrome.
# Output goes to ~/Desktop/Torrehermosa-Social/<carousel-name>/<carousel>-NN.png

set -e

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SOCIAL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT_DIR="$HOME/Desktop/Torrehermosa-Social"

if [ ! -x "$CHROME" ]; then
  echo "Google Chrome no encontrado en $CHROME"
  exit 1
fi

mkdir -p "$OUT_DIR"

total_slides=0
total_carousels=0

for html in "$SOCIAL_DIR"/*.html; do
  name=$(basename "$html" .html)
  [ "$name" = "index" ] && continue

  slide_count=$(grep -c '<section class="slide' "$html")
  echo "→ $name ($slide_count slides)"

  carousel_out="$OUT_DIR/$name"
  mkdir -p "$carousel_out"

  for n in $(seq 1 "$slide_count"); do
    nn=$(printf "%02d" "$n")
    out_file="$carousel_out/${name}-${nn}.png"
    url="file://${html}?slide=${n}"

    "$CHROME" \
      --headless=new \
      --disable-gpu \
      --no-sandbox \
      --hide-scrollbars \
      --force-device-scale-factor=1 \
      --window-size=1080,1350 \
      --virtual-time-budget=3000 \
      --screenshot="$out_file" \
      "$url" >/dev/null 2>&1

    if [ -f "$out_file" ]; then
      total_slides=$((total_slides + 1))
    else
      echo "    ✗ falló slide $n"
    fi
  done

  total_carousels=$((total_carousels + 1))
done

echo ""
echo "✓ Listo. $total_slides slides de $total_carousels carruseles en:"
echo "  $OUT_DIR"
