const path = require('path')

module.exports = {
  entry: './src/scripts/application.js',
  output: {
    filename: 'application.js',
    path: path.resolve(__dirname, 'docs'),
  },
}
