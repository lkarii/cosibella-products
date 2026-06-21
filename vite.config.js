import { defineConfig } from 'vite';

export default defineConfig({
  base: '/cosibella-products/',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
