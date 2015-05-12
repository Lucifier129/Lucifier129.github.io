module.exports = {
  cache: true,

  entry: {
    'app': ['./js/app.jsx']
  },

  output: {
    filename: '[name].js'
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loader: "jsx-loader?harmony"}
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ["", ".js", ".jsx"],
    root: __dirname,
    modulesDirectories: ["node_modules"]
  }
}