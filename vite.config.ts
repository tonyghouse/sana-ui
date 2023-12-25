import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
let faviconURL = '/favicon.svg';

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['favicon.ico'],
  manifest: {
    name: "Terminal",
    short_name: "terminal",
    description: "Terminal app",
    icons: [
      {
        src: faviconURL,
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any maskable'
      }
    ],
    theme_color: '#171717',
    background_color: '#f0e7db',
    display: "standalone",
    scope: '/',
    start_url: "/",
    orientation: 'portrait',
    prefer_related_applications:true
  }
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});