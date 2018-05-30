const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackEntries = require('./webpack-entries');

const ROOT_DIR = path.resolve(__dirname, '..');
const port = +process.env.PORT + 1 || 7214;
const host = process.env.HOST || 'localhost';
const { ALLOWED_HOSTS } = process.env;
const allowedHosts = ALLOWED_HOSTS ? [ALLOWED_HOSTS] : undefined;

function cssLoaders(isProd, bundles) {
  if (!isProd) {
    bundles.unshift('css-hot-loader');
  }

  return bundles;
}

module.exports = (env) => {
  const production = env === 'production';
  const config = {
    mode: production ? 'production' : 'development',
    context: ROOT_DIR,
    entry: webpackEntries,
    output: {
      publicPath: '/static/webpack-bundles/',
      path: path.join(ROOT_DIR, '/static/webpack-bundles'),
      filename: production ? '[name]-[chunkhash].js' : '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.(sass|scss)$/,
          use: cssLoaders(production, [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]),
        },
        {
          test: /\.css$/,
          use: cssLoaders(production, [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
          ])
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg|otf|png)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/'
            }
          }]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.json', '.scss', '.css'],
    },
    devtool: production ? 'source-map' : 'cheap-module-eval-source-map'
  };

  if (production) {
    config.plugins = [
      new CleanWebpackPlugin(['webpack-bundles']),
      new BundleTracker({
        path: path.join(ROOT_DIR, 'var'),
        filename: 'webpack-bundles.json'
      }),
      new MiniCssExtractPlugin({
        filename: '[name]-[contenthash].css',
        chunkFilename: '[id].css'
      })
    ];
  } else {
    config.plugins = [
      new BundleTracker({
        path: path.join(ROOT_DIR, 'var'),
        filename: 'webpack-dev-bundles.json'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    ];

    config.output.publicPath = '/webpack/';
    config.devServer = {
      historyApiFallback: true,
      compress: true,
      overlay: true,
      allowedHosts,
      host,
      port
    };
  }

  return config;
};
