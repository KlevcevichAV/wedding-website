// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // Замени 'wedding-website' на имя твоего репозитория на GitHub
  base: '/wedding-website/'
})