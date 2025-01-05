const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        "https://18a5fe61dbb7.ngrok.app",
      createProxyMiddleware( {
        target: 'http://localhost:3000/LoginPage',
        changeOrigin: true
      })
    )
    
  };