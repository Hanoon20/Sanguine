import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// The components are written against the React API; Preact's compat layer
// serves it at a fraction of the size (react + react-dom is ~130 KB min).
// `vite build --mode single` produces one self-contained index.html.
export default defineConfig(({ mode }) => ({
  plugins: [preact(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  build: {
    target: 'es2019',
    assetsInlineLimit: mode === 'single' ? 100000000 : 4096,
    cssCodeSplit: mode !== 'single',
  },
}));
