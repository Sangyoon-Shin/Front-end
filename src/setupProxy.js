const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // 프록시 경로 (프론트엔드에서 API 호출 시 '/api'를 붙임)
    createProxyMiddleware({
      target: 'https://119eddbfb3ba.ngrok.app ', // 실제 백엔드 URL
      changeOrigin: true,
    })
  );
};
