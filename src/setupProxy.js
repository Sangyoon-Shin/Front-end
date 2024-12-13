const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        "/https://04c3-117-16-196-170.ngrok-free.app",
      createProxyMiddleware( {
        target: 'http://localhost:3000/LoginPage',
        changeOrigin: true
      })
    )
    
  };