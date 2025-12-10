import { defineConfig } from 'vite';
import { resolve } from "node:path";

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  if (command === 'serve' && !isPreview) {
   
    return {
      root: resolve(__dirname, 'src'),
    }
    
  } else if (isPreview)  {
    return { /* placeholder for logger options */ }
  } else {
    return {
      root: resolve(__dirname, 'src'),
      build: {
        //base: resolve(__dirname, 'public'),
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'src/index.html'),
            about: resolve(__dirname, 'src/about/index.html'),
            blog: resolve(__dirname, 'src/blog/index.html'),
            case_studies: resolve(__dirname, 'src/case-studies/index.html'),
            contact: resolve(__dirname, 'src/contact/index.html'),
          },
          
        }
      }
    }
  }

})