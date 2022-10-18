import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import FullReload from 'vite-plugin-full-reload'


export default defineConfig({
  plugins: [
    RubyPlugin(),
    FullReload(['config/routes.rb', 'app/views/**/*'], { delay: 200 })
  ],
  server: {
    host: 'localhost',
    port: 3036,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    }
  },
  resolve: {
    alias: {
      '~bootstrap': 'bootstrap',
    }
  },

})