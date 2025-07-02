import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  theme:{
    extend: {
      colors:{
        'primary':"#5F6FFF"
      }
    },
  },
  plugins: [
    tailwindcss(),
    react()
  ],
})
// https://vite.dev/config/

