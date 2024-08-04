// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Ensure this matches the output directory Vercel expects
  },
})
