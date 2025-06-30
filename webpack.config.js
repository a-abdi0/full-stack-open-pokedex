const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]]
          }
        }
      },
      { test: /\.html$/, use: ["html-loader"] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  resolve: { extensions: [".js", ".jsx"] },
  devServer: {
    historyApiFallback: true,
    static: { directory: path.join(__dirname, 'dist') },
    port: 8080,
  },
  plugins: [
    new HtmlWebPackPlugin({ template: "./public/index.html", filename: "index.html" })
  ]
};