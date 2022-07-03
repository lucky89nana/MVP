const webpack = require("webpack");
const path = require("path");
var SRC_DIR = path.join(__dirname, "/client/src");
var DIST_DIR = path.join(__dirname, "/client/dist");

const config = {
  entry: ["react-hot-loader/patch", `${SRC_DIR}/index.js`],
  output: {
    path: DIST_DIR,
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: "./dist",
    },
  },
};

module.exports = config;
