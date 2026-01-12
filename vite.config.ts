import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // On a ajouté '-swc' ici
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/promos-tunisie/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
