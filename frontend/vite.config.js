import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Increase the warning threshold to 1000 kB (1 MB)
    chunkSizeWarningLimit: 5000, 
  },

   base: '/',
  plugins: [react()],

});
