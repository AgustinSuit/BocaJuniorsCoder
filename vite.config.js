import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        plantel: resolve(__dirname, 'pages/plantel.html'),
        bombonera: resolve(__dirname, 'pages/la-bombonera.html'),
        historia: resolve(__dirname, 'pages/historia-del-club.html'),
        la12: resolve(__dirname, 'pages/la-12.html'),
        contacto: resolve(__dirname, 'pages/contacto.html'),
      },
    },
  },
});
