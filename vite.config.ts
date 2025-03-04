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
      registerType: 'autoUpdate',
      manifest: {
        theme_color: '#00c2a2',
        background_color: '#00c2a2',
        display: 'standalone',
        // ... other manifest options
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html}'],
        // Cấu hình cache
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/.*\.cloudinary\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cloudinary-images',
              expiration: {
                maxEntries: 30, // Giảm mạnh số lượng hình ảnh được cache
                maxAgeSeconds: 60 * 60 * 24, // Chỉ lưu 1 ngày
                purgeOnQuotaError: true, // Xóa cache khi vượt quá quota
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'local-images',
              expiration: {
                maxEntries: 10, // Rất ít hình ảnh được cache
                maxAgeSeconds: 60 * 60 * 24 * 3, // 3 ngày
                purgeOnQuotaError: true,
              },
            },
          },
          {
            urlPattern: /.*\.(?:js|css)/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24, // 1 ngày
              },
            },
          },
          {
            urlPattern: /.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'default-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24, // 1 ngày
              },
            },
          },
        ],
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
