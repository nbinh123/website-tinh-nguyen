const path = require('path');
// import App from "./App"

module.exports = {
  mode: 'development',
  entry: 'App.js', 
  output: {
    path: path.resolve(__dirname, '/public'),
    filename: 'index.html',
  },
  resolve: {
    fallback: {
      zlib: false,
      querystring: false,
      path: false,
      crypto: false,
      stream: false,
      http: false,
      url: false,
      buffer: false,
      util: false
    }
  }
};
