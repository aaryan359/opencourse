import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'

export default defineConfig({
  base: isGitHubActions && repoName ? `/${repoName}/` : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
