import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      // key: './vue3-app-2-privateKey.key',
      // cert: './vue3-app-2.crt'
      key: "./private.key",
      cert: "./certificate.crt",
    },
    proxy: {
      "/api": {
        target: "https://localhost:8081",
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy will be an instance of 'http-proxy'
        },
      },
    },
  },
});
