import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      tailwindcss: path.resolve("./node_modules/tailwindcss")
    }
  }
})
