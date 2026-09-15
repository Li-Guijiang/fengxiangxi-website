import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  base: '/',
  plugins: [vue()],
  server: { localhost: '0.0.0.0', port: 5173 }
})
