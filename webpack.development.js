/*eslint-disable*/
var webpack = require('webpack')
var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin')
var dashboard = new Dashboard()
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var path = require('path')
var _ = require('lodash')
var pkg = require('./package.json')
var argv = require('yargs').argv
var deps = Object.keys(pkg.dependencies)
_.pull(deps, 'dejs')
var DEV_SERVER_HOST = `http://127.0.0.1:8080`

module.exports = {
  entry: {
    vendor: deps.concat([
      'webpack/hot/dev-server',
      'webpack-dev-server/client?' + DEV_SERVER_HOST
    ]),
    app: ['babel-polyfill', './assets/index.js']
  },
  output: {
    filename: './assets-dist/app.js',
    // 必须加上否则在js中require图片之后src路径不对
    publicPath: DEV_SERVER_HOST
  },
  module: {
    loaders:[
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules',
          publicPath: DEV_SERVER_HOST
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        // name严格输出文件到本地目录，但是会导致css内的图片、字体资源路径不对
        loader: `url-loader?limit=1024&name=./assets-dist/img/[hash].[ext]`
      },
      // file-loader https://github.com/webpack/file-loader
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?.*)?$/,
        loader: `file-loader?name=./assets-dist/fonts/[hash].[ext]`
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": `"development"`
      }
    }),
    new ExtractTextPlugin({
      filename: './assets-dist/css/bundle.css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: './assets-dist/common.js'
    }),
    new DashboardPlugin(dashboard.setData),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: '#source-map'
}
