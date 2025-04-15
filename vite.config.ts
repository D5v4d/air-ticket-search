import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  base: '/air-ticket-search/', // Укажите имя вашего репозитория
  build: {
    outDir: 'dist', // Убедитесь, что это правильная директория сборки
  },
});