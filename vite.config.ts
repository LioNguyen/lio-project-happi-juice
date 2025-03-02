import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import Sitemap from 'vite-plugin-sitemap'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://www.happi-juice.shop',
      lastmod: new Date(),
      changefreq: 'daily',
      priority: 0.8,
      exclude: ['/admin/*', '/private/*'],
    }),
    VitePWA({
      manifest: {
        theme_color: '#00c2a2',
        background_color: '#00c2a2',
        display: 'standalone',
        // ... other manifest options
      },
      workbox: {
        // ... workbox options
      },
      // Ensures meta tags are injected
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'masked-icon.svg'],
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@public', replacement: '/public' },
      { find: '@designSystem', replacement: '/designSystem' },
    ],
  },
})
