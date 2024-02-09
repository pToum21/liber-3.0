import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001',
        // get the new/official backend url to print and people can fetch from that
        secure: false,
        changeOrigin: true
      }
    }
  }
})

