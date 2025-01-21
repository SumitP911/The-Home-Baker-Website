import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',  // Add this line to specify the root path
  server: {
    host: '0.0.0.0',  // Bind to all network interfaces
    port: 3000,        // You can specify a different port if needed
    esbuild: {
      target: 'esnext',
      platform: 'linux',
    },
  },
});
