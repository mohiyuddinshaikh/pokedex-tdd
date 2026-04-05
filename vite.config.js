import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // 👈 THIS FIXES YOUR ISSUE
    globals: true,
    setupFiles: "./src/setupTests.js",
  },
});
