import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
    ],
    build: {
        emptyOutDir: false,
        lib: {
            entry: 'src/index.ts',
            name: 'index',
            fileName: 'index',
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                '@mui/material',
                '@emotion/react',
                '@emotion/styled'
            ],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    '@mui/material': 'MaterialUI',
                    '@emotion/react': 'EmotionReact',
                    '@emotion/styled': 'EmotionStyled',
                },
            },
        },
    }
})
