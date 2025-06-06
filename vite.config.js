import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    open: true, // 启动时自动打开浏览器
    hmr: {
      overlay: true // 如果你想关闭错误红屏，可以改为 false
    }
  }
})
