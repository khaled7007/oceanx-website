import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/article': {
        target: 'https://insight.oceanx.sa',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => {
          const slug = new URL(`http://x${path}`).searchParams.get('slug') ?? ''
          return `/${slug}/`
        },
      },
    },
  },
})
