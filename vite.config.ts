/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/promptlife/' : '/',
  plugins: [react()],
  // The build number is GitHub's deploy run number: one per publish (each push to main runs one).
  define: { __BUILD__: JSON.stringify(process.env.GITHUB_RUN_NUMBER ?? '') },
  build: {
    // The o200k_base tokenizer table (~2 MB) is its own chunk, loaded only at the Tokenizer station.
    chunkSizeWarningLimit: 2100
  },
  test: {
    // Only this app's tests: skip other working copies (.claude/worktrees) and the archived app.
    include: ['src/**/*.test.ts']
  }
})
