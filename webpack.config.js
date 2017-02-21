/**
 * Created by feichenxi on 2016/12/21.
 */

'use strict';

const path = require('path');
const glob = require('glob');
const gutil = require('gulp-util');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//----------
// 常量定义
//----------

const SRC_DIR = __dirname;
const DEST_DIR = path.join(SRC_DIR, 'dist');

//----------
// 通用函数
//----------

/**
 * 获取 webpack 配置
 * @param  {String} src  源地址
 * @param  {String} dest 目的地址
 * @return {Object}      webpack 配置
 */
function getWebpackConfig(src, dest) {
  const config = {
    entry: {
      'public/common/js/common': ['react', 'react-dom'],
    },
    output: {
      path: dest,
      filename: '[name]-[chunkhash:8].js',
      // publicPath: '/assets/',
    },
    module: {
      rules: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [path.resolve(src, 'node_modules')],
        options: {
          presets: ['es2015', 'react'],
        },
      }, {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap', 'sass-loader?sourceMap'],
        }),
      }, {
        test: /\.(ico|png|jpeg|jpg|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10,
          name: '/[path][name]-[hash:8].[ext]',
        },
      }],
    },
    resolve: {
      extensions: ['.js', '.json', '.jsx', '.css', 'scss'],
    },
    devtool: 'source-map',
    context: src,
    plugins: [
      // 将公共代码抽离出来合并为一个文件
      new webpack.optimize.CommonsChunkPlugin({
        name: 'public/common/js/common',
        minChunks: 3,
      }),
      // 将样式抽离出来作为单独的文件
      new ExtractTextPlugin('[name]-[contenthash:8].css'),
    ],
  };

  // 配置页面生成和入口脚本文件
  const entry = config.entry;
  const plugins = config.plugins;
  const htmlfiles = glob.sync('**/*.html', { cwd: path.join(src, 'views') });
  htmlfiles.forEach((item) => {
    const basename = path.basename(item, '.html');
    const tempname = item.replace(/\.html/, `/${basename}`);
    const chunkname = `public/pages/${tempname}`;
    entry[chunkname] = `./${chunkname}.jsx`;
    plugins.push(new HtmlWebpackPlugin({
      filename: `views/${item}`,
      template: path.join(SRC_DIR, 'views', item),
      chunks: ['public/common/js/common', chunkname],
      minify: false,
    }));
  });

  return config;
}

/**
 * webpack release 构建回调
 * @param  {Error}   err      [description]
 * @param  {[type]}   stats    [description]
 * @param  {Function} callback [description]
 */
function releaseCallback(err, stats, callback) {
  if (err) throw new gutil.PluginError('webpack', err);
  // noinspection JSCheckFunctionSignatures
  gutil.log('[webpack]', stats.toString('normal'));
  const jsonStats = stats.toJson();
  const wNum = jsonStats.warnings.length;
  const eNum = jsonStats.errors.length;
  let message = `(${wNum})warnings (${eNum})errors with webpack`;
  if (wNum > 0) {
    message += `\n\n${jsonStats.warnings.join('\n\n')}`;
  }
  if (eNum > 0) {
    message += `\n\n${jsonStats.errors.join('\n\n')}`;
    throw new gutil.PluginError('webpack', message, { showStack: false });
  }
  gutil.log(`result: ${message}`);
  if (callback) callback();
}

/**
 * webpack debug 构建回调
 * @param  {Error}   err      [description]
 * @param  {[type]}   stats    [description]
 * @param  {Function} callback [description]
 */
function debugCallback(err, stats, callback) {
  if (err) throw new gutil.PluginError('webpack', err);
  // gutil.log('[webpack]', stats.toString('minimal'))
  const jsonStats = stats.toJson();
  let message = `Hash: ${jsonStats.hash} Time: `;
  message += (
    jsonStats.time >= 1000
    ? `${jsonStats.time / 1000}s`
    : `${jsonStats.time}ms`
  );
  const wNum = jsonStats.warnings.length;
  const eNum = jsonStats.errors.length;
  message += ` (${wNum})warnings (${eNum})errors`;
  if (wNum > 0) message += `\n\n${jsonStats.warnings.join('\n\n')}`;
  if (eNum > 0) message += `\n\n${jsonStats.errors.join('\n\n')}`;
  gutil.log('[webpack]', message);
  if (callback) callback();
}

// 获取配置
module.exports = getWebpackConfig(SRC_DIR, DEST_DIR);

// 导出通用函数
module.exports.getWebpackConfig = getWebpackConfig;
module.exports.releaseCallback = releaseCallback;
module.exports.debugCallback = debugCallback;
