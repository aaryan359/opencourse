import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  proxy: {
    "/": {
      target: "https://opencoursebackend.onrender.com",
      changeOrigin: true,
      secure: false
    }
  },
 


   
  plugins: [react()],
  
})
