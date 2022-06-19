import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': {
      'BASE_API': "http://127.0.0.1:8000/"
    }
  },
  base: './',		// 打包后文件引用资源的路径
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    open: true,
    host: 'localhost',
    port: 8080,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: { //配置跨域
      '/api': {
        target: 'http://127.0.0.1:8000/api/', //这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, //允许跨域
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
})