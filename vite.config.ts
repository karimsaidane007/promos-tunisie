import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/promo-tunisie/', // <-- Cette ligne dit au site où il se trouve
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
