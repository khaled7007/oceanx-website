import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/wp-proxy': {
        target: 'https://insight.oceanx.sa',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wp-proxy/, ''),
      },
    },
  },
})
