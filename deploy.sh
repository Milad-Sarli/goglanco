#!/bin/bash
set -e

echo "Building Next.js app..."
npm run build

echo "Creating deployment package..."
rm -rf deploy deploy.zip
mkdir -p deploy/.next/static
cp -r .next/standalone/* deploy/
cp -r .next/static/* deploy/.next/static/
cp -r public deploy/public

echo "Zipping..."
cd deploy
zip -r ../deploy.zip .
cd ..

rm -rf deploy
echo "Created deploy.zip ($(du -h deploy.zip | cut -f1))"
echo ""
echo "NEXT STEPS:"
echo "1. Go to https://goglanco.com:2083 → File Manager → /home/rashagos/goglancoapp"
echo "2. Upload deploy.zip"
echo "3. Extract deploy.zip in that folder"
echo "4. Go to Node.js Selector → start the app (startup file: server.js)"
