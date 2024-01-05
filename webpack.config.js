// webpack.config.js

const path = require("path");
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin"); //  generate html file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // clean bundle directory

const devMode = true;

module.exports = {
  mode: devMode ? "development" : "production", // dev or pro
  devtool: devMode ? "eval-source-map" : "",
  // entry: {
  //   main: path.resolve(__dirname, "./src/main.js"), // File nhập
  //   test: path.resolve(__dirname, "./src/test.js"),
  // },
  entry: {
    home: [
      './src/js/home.js',
      './src/styles/home.scss'
    ],
    about: [
      './src/js/about.js',
    ]
    // home: {
    //   import: "./src/js/home.js",
    //   filename: "js/home.[contenthash].js",
    // },
    // about: {
    //   import: "./src/js/about.js",
    //   filename: "js/about.[contenthash].js",
    //   dependOn: "home",
    // },
  },
  output: {
    filename: "[name].js", // file xuất <- multiple files hoặc đặt tên 1 file như output.js
    // filename: "output.js",
    path: path.resolve(__dirname, "dist"), // thư mục xuất file
    clean: true, // config của webpack hoặc sử dụng CleanWebpackPlugin,
    publicPath: "",
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/](jquery)[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
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
      {
        // test: /\.(png|svg|jpg|gif|jpe?g)$/,
        test: /\.(png|jpe?g|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/[hash][ext]",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: "fonts/[hash][ext]",
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
    devMiddleware: {
      index: "home.html",
      writeToDisk: true
    }
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new HtmlWebpackPlugin({
      filename: "home.html",
      template: "./src/templates/home.html",
      inject: "body",
      chunks: ['home'],
    }),
    new HtmlWebpackPlugin({
      filename: "about.html",
      template: "./src/templates/about.html",
      inject: "body",
      chunks: ['about'],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),

    new BundleAnalyzerPlugin()

    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   generateStatsFile: true,
    //   openAnalyzer: false,
    //   logLevel: 'info'
    // })
  ],
};
