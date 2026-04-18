import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'
const basePath = process.env.VITE_BASE_PATH ?? (isGitHubActions ? '/opencourse/' : '/')

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
