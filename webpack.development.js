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
var DEV_SERVER_HOST = `http://127.0.0.1:${argv.port}`

module.exports = {
  resolve: {
    alias: {
      components: path.join(__dirname, '/assets/components'),
      containers: path.join(__dirname, '/assets/containers'),
      utils: path.join(__dirname, '/assets/utils'),
      constants: path.join(__dirname, '/assets/constants'),
      styles: path.join(__dirname, '/assets/styles'),
      stores: path.join(__dirname, '/assets/stores')
    }
  },
  entry: {
    vendor: deps.concat([
      'webpack/hot/dev-server',
      'webpack-dev-server/client?' + DEV_SERVER_HOST
    ]),
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
          use: 'css-loader',
          publicPath: ''
        })
      },
      {
        test: /\.cssx$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules',
          // 设置为相对loader的输出路径的路径
          publicPath: ''
        })
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader',
          publicPath: ''
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        // name严格输出文件到本地目录，但是会导致css内的图片、字体资源路径不对
        loader: `url-loader?limit=1024&name=../images/[name].[ext]`
      },
      // file-loader https://github.com/webpack/file-loader
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?.*)?$/,
        loader: `file-loader?name=../fonts/[name].[ext]`
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
      url: `${DEV_SERVER_HOST}/assets/`
    })
  ]
}
