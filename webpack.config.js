const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src'),

  output: {
    filename: 'bundle.[hash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },

  resolve: {
    extensions: ['.ts', '.tsx', 'd.ts', '.js', '.jsx', '.json'],
  },

  module: {
    rules: [
      { test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/static/html/index.html',
    }),
  ],

  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },

  mode: 'development',
  devtool: 'source-map',
};
