#!/bin/bash
# Prints cv/cv.html to the downloadable PDF served by the site.
#   bash cv/build.sh
set -e
cd "$(dirname "$0")"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --no-pdf-header-footer --virtual-time-budget=4000 \
  --print-to-pdf="$PWD/../public/Toluwanimi-Olukosi-CV.pdf" "file://$PWD/cv.html" 2>/dev/null
echo "wrote public/Toluwanimi-Olukosi-CV.pdf"
