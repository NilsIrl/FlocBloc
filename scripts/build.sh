#!/usr/bin/env sh

cp node_modules/webextension-polyfill/dist/browser-polyfill.min.js .
zip FlocBloc.zip browser-polyfill.min.js options.html options.js settings.js manifest.json floc-spoofer.js
