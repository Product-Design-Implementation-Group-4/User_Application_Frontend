import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build", // Customize output directory
  },
  define: {
    "process.env": process.env, // Makes `process.env` available in your app
  },
  server: {
    historyApiFallback: true, // Ensure React Router works
  },
  preview: {
    historyApiFallback: true, // Fallback for preview mode
  },
});
