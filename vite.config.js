import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    svelte(),
    VitePWA(
          {
            workbox: {
              globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
            },
            registerType: "autoUpdate",
            manifest: {
              "background_color": "#151515",
              "theme_color": "#212121",
              "name": "WebPlot",
              "short_name": "WebPlot",
              "start_url": "/",
              "display": "standalone",
              "icons": [
                {
                  "src": "icon512.png",
                  "sizes": "512x512",
                  "type": "image/png",
                }
              ]
            }
          })
  ]
})
