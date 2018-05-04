const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ROOT_DIR = path.resolve(__dirname, '..');
const port = +process.env.PORT + 1 || 7322;
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
    mode: production ? "production" : "development",
    context: ROOT_DIR,
    entry: {
      'main': './static/js/index.js',
      'main-css': './static/scss/reminder-app.scss'
    },
    plugins: [
        new BundleTracker({
          path: path.join(ROOT_DIR, 'var'),
          filename: 'webpack-bundles.json'
        })
      ],
    output: {
      publicPath: '/webpack-bundles/',
      path: path.join(ROOT_DIR, '/static/webpack-bundles'),
      filename: production ? '[name]-[hash].js' : '[name].js',
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
        }
      ]
    },
    resolve: {
      extensions: [".js", ".json", ".scss", ".css"],
    },
    devtool: production ? 'source-map' : 'cheap-module-eval-source-map'
  };

  if (production) {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: "[name]-[contenthash].css",
        chunkFilename: "[id].css"
      })
    );
  } else {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
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
