import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


const pathSrc = path.resolve(__dirname, 'src')


export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),

    AutoImport({
      dirs: [path.resolve(pathSrc, 'composables')],

      resolvers: [
        ElementPlusResolver(),
      ],
      vueTemplate: true,
      dts: path.resolve(pathSrc, 'typings', 'auto-imports.d.ts'),
    }),

    Components({
      resolvers: [
        ElementPlusResolver(),
      ],

      dts: path.resolve(pathSrc, 'typings', 'components.d.ts'),
    }),

  ],

  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
})
