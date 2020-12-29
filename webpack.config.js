const path = require('path')

module.exports = {
  entry: './src/scripts/application.js',
  output: {
    filename: 'application.js',
    path: path.resolve(__dirname, 'docs'),
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
