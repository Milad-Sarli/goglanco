#!/bin/bash
cd /Users/miladsarli/Documents/Projects/NextJs/Goglanco-project/goglanco
rm -rf .next/routes-manifest.json 2>/dev/null || true
rm -rf .next/build-manifest.json 2>/dev/null || true
rm -f .next/static/development/_buildManifest.js.tmp.* 2>/dev/null || true
exec npx next dev --turbopack -p 3006
