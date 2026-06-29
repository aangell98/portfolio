import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site is served from /portfolio/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
})
