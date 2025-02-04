import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/chef_AI/",
  define: {
    "process.env.HUGGINGFACE_API_KEY": JSON.stringify(process.env.HUGGINGFACE_API_KEY)
  },
  esbuild: {
    loader: 'tsx', // Дозволяє обробляти файли TypeScript },
  },
  })
