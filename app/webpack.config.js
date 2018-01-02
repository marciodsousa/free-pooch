const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const distUrl = 'dist';

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/index.html',
  inject: true,
});

const HotModuleReplacementPluginConfig = new webpack.HotModuleReplacementPlugin();

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './src/index.js',
  ],
  output: {
    path: path.resolve(distUrl),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['react-hot-loader/webpack', 'babel-loader'],
        exclude: /node_modules/
      },
      // Extract all .global.css to style.css as is
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [autoprefixer];
                },
              },
            },
          ],
          fallback: 'style-loader',
        }),
      },

      // Add SASS support  - compile all .global.scss files and pipe it to style.css
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [autoprefixer];
                },
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
          fallback: 'style-loader',
        }),
      },
      // WOFF Font
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        },
      },
      // WOFF2 Font
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        },
      },
      // TTF Font
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream',
          },
        },
      },
      // EOT Font
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      },
      // SVG Font
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
          },
        },
      },
      // Common Image Formats
      {
        test: /\.(?:ico|gif|png|PNG|jpg|jpeg|webp)$/,
        use: 'url-loader',
      }
    ],
  },

  plugins: [
    HtmlWebpackPluginConfig,
    HotModuleReplacementPluginConfig,
        /**
         * Create global constants which can be configured at compile time.
         *
         * Useful for allowing different behaviour between development builds and
         * release builds
         *
         * NODE_ENV should be production so that modules do not perform certain
         * development checks
         */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    }),

    new ExtractTextPlugin('style.css'),

    new BundleAnalyzerPlugin({
      analyzerMode: process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
      openAnalyzer: process.env.OPEN_ANALYZER === 'true',
    }),
  ],
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, distUrl),
    publicPath: '/',
    historyApiFallback: true,
    disableHostCheck: true,
  },
};
