import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/COMP-4513-Assignment-2/',
  plugins: [react()],
});