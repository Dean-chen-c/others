const path = require("path");
module.exports = {
  mode: "development",
  entry: "./index",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), // string
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: ["@babel/transform-runtime"],
        },
      },
    ],
  },
};
