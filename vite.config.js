import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { globSync } from 'glob'
import cdn from 'vite-plugin-cdn-import'

const pages = globSync('./*.html').map((v) => v.replace(/^(.*)\.html/, '$1'))
export default defineConfig({
  base: '/xiazhi-paint/',
  server: {
    port: 5184,
  },
  build: {
    rollupOptions: {
      input: pages.reduce((pv, cv) => {
        pv[cv] = fileURLToPath(new URL(`${cv}.html`, import.meta.url))
        return pv
      }, {}),
    },
  },
  plugins: [
    cdn({
      modules: [
        {
          name: 'p5',
          var: 'p5',
          path: 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js',
        },
        {
          name: 'matter-js',
          var: 'Matter',
          path: 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js',
        },
      ],
    }),
  ],
})
