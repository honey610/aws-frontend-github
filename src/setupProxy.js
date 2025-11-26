const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/repo',
    createProxyMiddleware({
      target: 'http://13.50.196.250',
      changeOrigin: true,
    })
  );
};