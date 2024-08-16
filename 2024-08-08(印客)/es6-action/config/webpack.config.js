// commonjs 规范
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// webpack 打包是基于模块化处理
module.exports = {
  mode: 'development', // 配置当前执行 webpack 环境， development | production
  devtool: false, // 此选项控制是否生成，以及如何生成 source map。
  entry: './src/index.ts', // 项目入口文件 './xx/xx' | []  | { main : './x.js'}

  // module （模块化规范） -> chunk (代码块) -> bundle (打包后的文件)
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, { loader: 'css-loader' }]
      },
      //处理 js/ts 文件
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader'
      }
    ]
  },

  // 打包增强，使用插件处理，在loader之后
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx']
  },
  // 文件出口
  output: {
    path: path.resolve(__dirname, '../dist')
  }
};
