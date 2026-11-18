import { defineConfig } from 'vite';

// base relativa: el sitio funciona en https://<usuario>.github.io/<repo>/
// sin importar el nombre del repositorio.
export default defineConfig({
  base: './',
  build: { outDir: 'dist', assetsInlineLimit: 0 },
});
