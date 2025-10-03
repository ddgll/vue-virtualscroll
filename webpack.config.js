const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './dev/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: false,
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm-bundler.js'
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "/"),
    },
    historyApiFallback: true,
    watchFiles: ['src/**/*', 'dev/**/*'],
  },
  devtool: 'source-map'
};

if (isProduction) {
  module.exports.entry = './src/index.js';

  module.exports.externals = {
    "vue": "vue"
  };

  module.exports.output = {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: {
        name: 'VueVirtualScroll',
        type: 'umd',
        umdNamedDefine: true,
    },
    globalObject: 'this',
  };

  module.exports.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  );
}