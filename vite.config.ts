import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' — zostavený web (dist/) funguje z ľubovoľného priečinka alebo statického hostingu
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // animácie v samostatnom súbore; Leaflet a Recharts delí Vite automaticky
        // podľa odloženého načítania kapitol Mapa a Dáta (src/App.tsx)
        manualChunks: {
          motion: ['motion'],
        },
      },
    },
  },
})
