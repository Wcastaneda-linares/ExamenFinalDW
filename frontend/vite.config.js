import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // reenviar las solicitudes que comienzan con `/api/` a tu servidor backend.
      '/api': 'http://localhost:3000', // asumiendo que tu backend se ejecuta en el puerto 3001
    },
  },
});


