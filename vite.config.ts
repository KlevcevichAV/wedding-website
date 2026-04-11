import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  // ВАЖНО: имя твоего репозитория со слешами
  base: '/wedding-website/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})