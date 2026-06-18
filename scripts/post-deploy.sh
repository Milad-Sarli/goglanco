#!/bin/bash
cd /home/rashagos/goglancoapp
npm install --legacy-peer-deps --production 2>/dev/null
npm run build 2>/dev/null
echo "Deploy complete: $(date)" >> /home/rashagos/deploy.log
