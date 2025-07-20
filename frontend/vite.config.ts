import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        proxy: {
            '/countries': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/countries/, ''),
            },
        },
    },
    build: {
        outDir: 'dist',
    },
    test: {
        environment: 'jsdom',
        setupFiles: ['cypress/support/component.ts'], // Reference the support file
    },
});