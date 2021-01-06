const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    application: './src/scripts/application.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './docs',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'head',
      chunks: ['application'],
      filename: 'index.html',
    }),
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'docs'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            {
              plugins: ['@babel/plugin-proposal-class-properties'],
            },
          ],
        },
      },
      { test: /\.ya?ml$/, type: 'json', use: 'yaml-loader' },
    ],
  },
}
