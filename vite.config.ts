import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // GitHub Pages sirve la app en /fitcore-app/
  base: '/fitcore-app/',
  server: { host: true }, // permite abrirla desde el celular en la misma red Wi-Fi
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Fitcore App',
        short_name: 'Fitcore App',
        description: 'Plan de comidas, registro de calorías y progreso',
        lang: 'es',
        theme_color: '#16a34a',
        background_color: '#f6f7f4',
        display: 'standalone',
        start_url: '.',
        scope: '.',
        icons: [
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
        ],
      },
    }),
  ],
})
