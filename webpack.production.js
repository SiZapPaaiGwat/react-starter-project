/*eslint-disable*/
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var path = require('path')
var projectName = 'LaunchAuxiliary'
var _ = require('lodash')
var pkg = require('./package.json')
var WebpackMd5Hash = require('webpack-md5-hash')
var argv = require('yargs').argv
var deps = Object.keys(pkg.dependencies)
var host = argv.host || '127.0.0.1'
var port = argv.port || 8080
var DEV_SERVER_HOST = `http://${host}:${port}`
// css和dejs不打包
_.pull(deps, 'dejs', 'bootstrap', 'font-awesome')
var DEPS = _.pull(deps.concat(), 'superagent-mocker')
var BUILD_DIR = `../../assets-dist/${projectName}`
// TODO 加入到官网
// require图片时使用这个publicPath，css loader有自己的publicPath
var FONTS_PATH = `${BUILD_DIR}/fonts`
var IMG_PATH = `${BUILD_DIR}/img`
var PLUGINS = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin()
]
console.log(`
  Current project name is ${projectName}.
  We are running in <<production>> mode ...
  Our vendor module list contains:
  ${[''].concat(DEPS).sort().join('\n\t\t\t')}
`)
var JS_DIR = `${BUILD_DIR}`
var STYLE_BUNDLE_PATH = `${BUILD_DIR}/css/bundle.[contenthash:8].css`
var config =  {
  BUILD_DIR,
  DEV_SERVER_HOST,
  PLUGINS,
  DEPS,
  FONTS_PATH,
  IMG_PATH,
  STYLE_BUNDLE_PATH,
  ENTRY_PATH : `./index.js`,
  APP_BUNDLE_PATH : `${JS_DIR}/app.[chunkhash:8].js`,
  VENDOR_BUNDLE_PATH : `${JS_DIR}/common.[chunkhash:8].js`
}
var PUBLIC_PATH = './'
module.exports = {
  entry: {
    vendor: config.DEPS,
    app: ['babel-polyfill', config.ENTRY_PATH],
  },
  output: {
    filename: config.APP_BUNDLE_PATH,
    // 必须加上否则在js中require图片之后src路径不对
    publicPath: PUBLIC_PATH
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory&presets[]=es2015&presets[]=react',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader', {
          // 需要重写，否则路径不对
          publicPath: config.PUBLIC_PATH
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        // name严格输出文件到本地目录，但是会导致css内的图片、字体资源路径不对
        loader: `url-loader?limit=1024&name=${config.IMG_PATH}/[hash].[ext]`
      },
      // file-loader https://github.com/webpack/file-loader
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?.*)?$/,
        loader: `file-loader?name=${config.FONTS_PATH}/[hash].[ext]`
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": `"production"`
      }
    }),
    new ExtractTextPlugin(config.STYLE_BUNDLE_PATH, {allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin('vendor', config.VENDOR_BUNDLE_PATH),
    new WebpackMd5Hash()
  ].concat(config.PLUGINS)
}
