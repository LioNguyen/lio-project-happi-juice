import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import Sitemap from 'vite-plugin-sitemap'

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
  ],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@public', replacement: '/public' },
      { find: '@designSystem', replacement: '/designSystem' },
    ],
  },
})
