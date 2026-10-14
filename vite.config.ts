import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/promptlife/' : '/',
  plugins: [react()],
  build: {
    // The o200k_base tokenizer table (~2 MB) is its own chunk, loaded only at the Tokenizer station.
    chunkSizeWarningLimit: 2100
  }
})
