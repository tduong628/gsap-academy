import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// On GitHub Pages the app is served from /<repo>/, locally from /.
// Set GHPAGES=1 (the deploy workflow does) to emit the repo base path.
const base = process.env.GHPAGES ? '/gsap-academy/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    target: 'es2020',
    cssMinify: true,
  },
});
