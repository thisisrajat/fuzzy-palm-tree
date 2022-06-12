require("dotenv").config();
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: path.join(__dirname, "app", "react", "index.js"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  output: {
    path: path.join(__dirname, "public", "assets", "webpack"),
    filename: "bundle.js",
    publicPath: "/",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.HOST": JSON.stringify(process.env.HOST),
    }),
  ],
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
};
