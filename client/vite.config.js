import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all API calls to the Express backend
      '/auth': { target: 'http://localhost:5000/api', changeOrigin: true },
      '/projects': { target: 'http://localhost:5000/api', changeOrigin: true },
      '/products': { target: 'http://localhost:5000/api', changeOrigin: true },
      '/categories': { target: 'http://localhost:5000/api', changeOrigin: true },
      '/leads': { target: 'http://localhost:5000/api', changeOrigin: true },
      '/faqs': { target: 'http://localhost:5000/api', changeOrigin: true },
      '/testimonials': { target: 'http://localhost:5000/api', changeOrigin: true },
      '/settings': { target: 'http://localhost:5000/api', changeOrigin: true },
      '/dashboard': { target: 'http://localhost:5000/api', changeOrigin: true },
      '/upload': { target: 'http://localhost:5000/api', changeOrigin: true },
    },
  },
})
