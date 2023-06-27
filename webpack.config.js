// webpack.config.js

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //  generate html file
// const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // clean bundle directory

const devMode = true;

module.exports = {
  mode: devMode ? "development" : "production", // dev or pro
  // entry: {
  //   main: path.resolve(__dirname, "./src/main.js"), // File nhập
  //   test: path.resolve(__dirname, "./src/test.js"),
  // },
  entry: {
    main: ["./src/main.js", "./src/test.js"],
  },
  output: {
    filename: "[name].js", // file xuất <- multiple files hoặc đặt tên 1 file như output.js
    // filename: "output.js",
    path: path.resolve(__dirname, "dist"), // thư mục xuất file
    clean: true, // config của webpack hoặc sử dụng CleanWebpackPlugin
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
  devServer: {
    open: true,
    static: {
      directory: path.join(__dirname, "./dist"),
    },
    port: 9000,
    compress: true,
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Webpack Bundle",
      filename: "index.html",
    }),
  ],
};
