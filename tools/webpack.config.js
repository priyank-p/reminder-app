const path = require('path');
const webpack = require('webpack');
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
  } else {
    for (let loader of bundles) {
      if (typeof loader === 'object' && loader.loader === 'css-loader') {
        loader.options.minimize = true;
      }
    }
  }

  return bundles;
}

module.exports = (env) => {
  const production = env === 'production';
  const cacheLoader = {
    loader: 'cache-loader',
    options: {
      cacheDirectory: path.resolve(__dirname, '../var/cache-loader'),
      cacheIdentifier: production ? 'production' : 'development'
    }
  };

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
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/'
            }
          }
        },
        {
          test: /reminder-app-sw\.js/,
          use: {
            loader: './tools/sw-loader',
            options: {
              emitDevFile: !production
            }
          }
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.json', '.scss', '.css', '.ts'],
    },
    devtool: production ? 'source-map' : 'cheap-module-eval-source-map',
    plugins: [
      new webpack.HashedModuleIdsPlugin()
    ]
  };

  if (production) {
    config.plugins.push(
      new CleanWebpackPlugin(['static/webpack-bundles'], {
        root: ROOT_DIR,
      }),
      new BundleTracker({
        path: path.join(ROOT_DIR, 'var'),
        filename: 'webpack-bundles.json'
      }),
      new MiniCssExtractPlugin({
        filename: '[name]-[contenthash].css',
        chunkFilename: '[id].css'
      })
    );

    config.module.rules.push({
      test: /\.svg$/,
      use: [cacheLoader, {
        loader: 'svg-url-loader',
        options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024,
          // Remove the quotes from the url
          // (they’re unnecessary in most cases)
          noquotes: true,
        }
      }]
    });
  } else {
    config.plugins.push(
      new BundleTracker({
        path: path.join(ROOT_DIR, 'var'),
        filename: 'webpack-dev-bundles.json'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    );

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
