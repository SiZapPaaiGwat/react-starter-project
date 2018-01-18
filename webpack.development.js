/*eslint-disable*/
var webpack = require('webpack')
var Dashboard = require('webpack-dashboard')
var DashboardPlugin = require('webpack-dashboard/plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OpenBrowserPlugin = require('open-browser-webpack-plugin')
var path = require('path')
var _ = require('lodash')
var pkg = require('./package.json')
var argv = require('yargs').argv
var dashboard = new Dashboard()
var deps = Object.keys(pkg.dependencies)

_.pull(deps, 'babel-polyfill', 'antd')

module.exports = {
  resolve: {
    alias: {
      components: path.join(__dirname, '/assets/components'),
      configs: path.join(__dirname, '/assets/configs'),
      constants: path.join(__dirname, '/assets/constants'),
      containers: path.join(__dirname, '/assets/containers'),
      images: path.join(__dirname, '/assets/images'),
      stores: path.join(__dirname, '/assets/stores'),
      styles: path.join(__dirname, '/assets/styles'),
      utils: path.join(__dirname, '/assets/utils')
    }
  },
  entry: {
    vendor: deps,
    app: ['./assets/index.js']
  },
  output: {
    filename: './assets/app.js',
    publicPath: ''
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
        loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0&plugins[]=transform-decorators-legacy',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules',
          publicPath: '../../'
        })
      },
      {
        test: /\.cssx$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
          // 设置为相对loader的输出路径的路径
          publicPath: '../../'
        })
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader',
          publicPath: '../../'
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        // name严格输出文件到本地目录，但是会导致css内的图片、字体资源路径不对
        loader: `url-loader?limit=1024&name=./assets/images/[name].[ext]`
      },
      // file-loader https://github.com/webpack/file-loader
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?.*)?$/,
        loader: `file-loader?name=./assets/fonts/[name].[ext]`
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": `"development"`
      }
    }),
    new ExtractTextPlugin({
      filename: './assets/styles/bundle.css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: './assets/common.js'
    }),
    new DashboardPlugin(dashboard.setData),
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({
      url: `http://127.0.0.1:${argv.port}/dev.html`
    })
  ]
}
