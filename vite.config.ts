import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import {VitePWA,VitePWAOptions} from "vite-plugin-pwa"

const manifestForPlugin:Partial<VitePWAOptions> = {
  registerType:'prompt',
  includeAssets:['favicon.ico'],
  manifest:{
    name:"Terminal",
    short_name:"terminal",
    description:"Terminal app",
    icons:[{
      src: '/favicon.png',
      sizes:'192x192',
      type:'image/png',
      purpose:'favicon'
    }
  ],
  theme_color:'#171717',
  background_color:'#f0e7db',
  display:"standalone",
  scope:'/',
  start_url:"/",
  orientation:'portrait'
  }
}

export default defineConfig({
  plugins: [react(),VitePWA(manifestForPlugin)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})