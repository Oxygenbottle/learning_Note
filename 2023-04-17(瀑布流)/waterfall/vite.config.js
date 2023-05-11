import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  resolve
} from "path"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist', // 指定打包路径，默认为项目根目录下的 dist 目录
    minify: "terser", // 必须开启：使用terserOptions才有效果
    terserOptions: {
      compress: {
        keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
        drop_console: true, // 生产环境去除 console
        drop_debugger: true // 生产环境去除 debugger
      },
    },
    chunkSizeWarningLimit: 1500 // chunk 大小警告的限制（以 kbs 为单位）
  },
  plugins: [
    vue(),
    // basicSsl()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  // base: './', // 打包路径
  // server: {
  //   host: '0.0.0.0',
  //   port: 4000, // 服务端口号
  //   open: true, // 服务启动时是否自动打开浏览器
  //   cors: true, // 允许跨域
  //   https: true, //是否支持http2 如果配置成true 会打开https://localhost:3001/xxx;
  //   strictPort: false, //是否是严格的端口号，如果true，端口号被占用的情况下，vite会退出
  // }
})