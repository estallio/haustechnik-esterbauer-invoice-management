import HtmlWebpackPlugin from 'html-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import MomentLocalesPlugin from 'moment-locales-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { resolve } from 'path';
import webpack from 'webpack';

import dotenv from 'dotenv';

dotenv.config();

const CopyPdfJsLibraryPlugin = process.env.USE_PDF_FILE_SYSTEM
  ? [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/pdf/pdfjs',
            to: 'pdf/pdfjs',
          },
        ],
      }),
    ]
  : [];

export default {
  target: process.env.USE_PDF_FILE_SYSTEM ? 'electron-renderer' : 'web',
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, '../dist'),
    publicPath: process.env.PUBLIC_PATH ? process.env.PUBLIC_PATH : '',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      /*
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      }, */
      {
        test: /node_modules\/(pdfkit|brotli|fontkit|linebreak|png-js|unicode-properties)/,
        loader: 'transform-loader?brfs',
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader', 'source-map-loader'],
        exclude: /node_modules/,
      },
      {
        // files containing *.module.css are loaded with css-modules: true
        test: /.module\.(scss|sass|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true, importLoaders: 1 },
          },
          'sass-loader',
        ],
      },
      {
        // files not containing *.module.css are loaded with css-modules: false
        test: /(?<!.module)\.(scss|sass|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: false, importLoaders: 1 },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{ loader: 'file-loader', options: { esModule: false } }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    ...CopyPdfJsLibraryPlugin,
    new HtmlWebpackPlugin({
      template: './src/index.html',
      baseUrl: process.env.BASE_PATH ? process.env.BASE_PATH : '/',
    }),
    new webpack.EnvironmentPlugin({
      // this is necessary when the site is not served over a webserver like nginx without index.html-fallback
      // normally, the browser sends a request to the webserver and the webserver redirects to the requested path or
      // serves the requestd file. in SPAs, where the routing-part is carried from the browser, the request must redirect
      // the the same html-file. to not serve another file and send the request back to the browser router, a common
      // solution to this problem is the try_files directive to send the index.html in any case and let the browser
      // handle the routing. if the webserver can not handle such a case like requesting a static file in electron
      // there is no webserver that handles a fallback-routing and we must switch to a hash-router that is working
      // entirely in the browser, but has also some drawbacks so we use the browser-router as default router.
      // in this project the default router is used for the browser where urls are resolved
      // like http://domain.at/router-path and the hash-router is used in the electron build where files are only provided
      // on a file-bases without resolving domains. e.g. file://index.html/#/router-path where "#" is a sub-path from hash-router
      USE_HASH_HISTORY: false,
      // this env-var can be set to specify the subpath from where the page is served, the main reason for this variable
      // is changing the static path of the react-router
      BASE_PATH: '/',
      // as electron don't has a native pdf-viewer, we have to use a library like pdfjs
      // pdfjs loads native files, so we need to save the pdf somewhere in the filesystem first
      USE_PDF_FILE_SYSTEM: false,
      // the next variables could also be passed through by e.g. the dot-env plugin, but this is easier and more predictable for now
      NAME: '',
      ADDRESS: '',
      PLACE: '',

      TEL: '',
      EMAIL: '',
      WEBSITE: '',

      IBAN: '',
      BIC: '',
      UID: '',
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['de'],
    }),
    new LodashModuleReplacementPlugin(),
  ],
};
