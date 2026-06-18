#!/bin/bash
set -e

echo "Building Next.js app..."
NEXT_PUBLIC_API_URL=https://admin.goglanco.com/ npm run build

echo "Creating deployment package..."
rm -rf deploy.zip
cd out
zip -r ../deploy.zip .
cd ..

echo ""
echo "✓ deploy.zip created ($(du -h deploy.zip | cut -f1))"
echo ""
echo "To deploy:"
echo "  1. cPanel File Manager → /home/rashagos/goglancoapp"
echo "  2. Upload deploy.zip"
echo "  3. Right-click → Extract"
echo "  4. Then visit https://goglanco.com/_extract.php to auto-extract and clean up"
