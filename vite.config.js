import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@':           path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@data':       path.resolve(__dirname, './src/data'),
      '@hooks':      path.resolve(__dirname, './src/hooks'),
      '@utils':      path.resolve(__dirname, './src/utils'),
      '@context':    path.resolve(__dirname, './src/context'),
      '@styles':     path.resolve(__dirname, './src/styles'),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          sections: [
            './src/components/sections/Services/Services.jsx',
            './src/components/sections/WhyMe.jsx',
            './src/components/sections/HowItWorks.jsx',
            './src/components/sections/Contact/Contact.jsx',
            './src/components/sections/Footer.jsx',
          ],
        },
      },
    },
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 600,
  },

  server: {
    port: 5173,
    strictPort: false,
    open: false,
  },
})
