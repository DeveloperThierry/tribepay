import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This intercepts any request starting with /api
      '/api': {
        // Target is your backend Workstation URL (port 3001)
        target: 'https://3001-firebase-tribepaygit-1780707605341.cluster-wfwbjypkvnfkaqiqzlu3ikwjhe.cloudworkstations.dev',
        changeOrigin: true,
        secure: false,
        // Optional: If your backend doesn't actually have "/api" in its routing,
        // you can rewrite the path. For example, rewriting /api/services to /services:
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
