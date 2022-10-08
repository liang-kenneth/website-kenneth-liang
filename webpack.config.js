const nodeExternals = require("webpack-node-externals");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

const typicalReact = {
  rules: [
    {
      test: /\.js$|jsx/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react", "@babel/preset-env"],
        },
      },
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: "style-loader",
        },
        {
          loader: "css-loader",
          options: {
            import: true,
            url: true,
          },
        },
      ],
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      include: path.resolve(__dirname, "src", "Assets"),
      type: "asset/resource",
    },
  ],
};

const clientConfig = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "main.js",
  },
  mode: "development",
  module: typicalReact,
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
};

const serverConfig = {
  entry: path.resolve(__dirname, "src", "server", "server.js"),
  output: {
    path: __dirname,
    filename: "server-compiled.js",
  },
  externals: [nodeExternals()],
  target: "node",
  mode: "development",
  module: typicalReact,
};

module.exports = [clientConfig, serverConfig];
