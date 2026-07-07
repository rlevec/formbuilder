import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'



export default ({ mode }: {mode: string}) => {
  const env = loadEnv(mode, process.cwd(), '')

  return defineConfig({
    plugins: [
         react(),
    babel({ presets: [reactCompilerPreset()] })
    ],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:6060',
          changeOrigin: true,
        },
        '/uploads': {
          target: env.VITE_API_URL || 'http://localhost:6060',
          changeOrigin: true,
        },
      },
    },
  })
}