const path = require('path');
const { NODE_ENV = 'production' } = process.env;
const isDev = NODE_ENV.includes('dev');
const dotenvWebpackPlugin = require('dotenv-webpack'); 

module.exports = {

  mode: isDev ? 'development' : 'production',
  entry: path.resolve(__dirname, 'client', 'src', 'index.jsx'),
  output: {
    filename: 'bundles.js',
    path: path.resolve(__dirname, 'client', 'dist')
  },
  watch: isDev,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(png|jpg)$/, 
        use: {
          loader: 'url-loader?limit=8192'
        }
        
      }
    ]
  },
  plugins: [
    new dotenvWebpackPlugin({
      path: './.env', // Path to .env file (this is the default)
      safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
    })
  ]
};