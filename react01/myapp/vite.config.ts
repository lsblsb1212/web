import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,               // 前端端口
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',   // ← 后端地址:端口（改成你的）
        changeOrigin: true,
        // 如果后端路由不带 /api 前缀，解开下面这行：
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
