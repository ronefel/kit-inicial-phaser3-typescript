/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/main.ts',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    writeToDisk: true,
    open: true,
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'index.html',
        },
        {
          from: 'assets/**/*',
        },
      ],
    }),
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true),
    }),
  ],
};
