import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import solidSvg from 'vite-plugin-solid-svg'
// import devtools from 'solid-devtools/vite';

export default defineConfig({
    plugins: [solidPlugin(), solidSvg()],
    server: {
        port: 3000,
    },
    build: {
        target: 'esnext',
    },
})
