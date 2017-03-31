/*eslint-disable*/
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var WebpackMd5Hash = require('webpack-md5-hash')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var OpenBrowserPlugin = require('open-browser-webpack-plugin')
var path = require('path')
var _ = require('lodash')
var pkg = require('./package.json')
var argv = require('yargs').argv
var deps = Object.keys(pkg.dependencies)

_.pull(deps, 'dejs', 'superagent-mocker')

module.exports = {
  resolve: {
    alias: {
      components: path.join(__dirname, '/assets/components'),
      containers: path.join(__dirname, '/assets/containers'),
      utils: path.join(__dirname, '/assets/utils'),
      constants: path.join(__dirname, '/assets/constants')
    }
  },
  entry: {
    vendor: deps,
    app: ['babel-polyfill', './assets/index.js'],
  },
  output: {
    filename: './assets-dist/app-[chunkhash:8].js',
    // 设置为根目录
    publicPath: '..'
  },
  module: {
    loaders:[
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
          // 设置为相对loader的输出路径的路径
          publicPath: '../../'
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        // 设置为输出路径
        loader: `url-loader?limit=1024&name=./assets-dist/images/[name]-[hash:8].[ext]`
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?.*)?$/,
        loader: `file-loader?name=./assets-dist/fonts/[name]-[hash:8].[ext]`
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
    new ExtractTextPlugin({
      filename: './assets-dist/styles/bundle-[contenthash:8].css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: './assets-dist/common-[chunkhash:8].js'
    }),
    new WebpackMd5Hash(),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'assets/template.html'),
      filename: path.join(__dirname, 'assets-dist/index.jsp')
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'assets/template.html'),
      filename: path.join(__dirname, 'assets-dist/index.html')
    }),
    new OpenBrowserPlugin({
      url: 'http://127.0.0.1:8080/assets-dist/'
    })
  ]
}
