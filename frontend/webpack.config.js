const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const GRAPHQL_URL = process.env.GRAPHQL_URL || 'http://127.0.0.1:3000/graphql';

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new webpack.DefinePlugin({
      'process.env.GRAPHQL_URL': JSON.stringify(GRAPHQL_URL)
    })
  ],
  devServer: {
    port: 8080,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'public')
    },
    client: {
      overlay: true
    }
  }
};
