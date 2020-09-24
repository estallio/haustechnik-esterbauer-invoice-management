import merge from 'webpack-merge';
import common from './webpack.config.common.babel';

export default merge(common, {
  mode: 'development',
  target: 'electron-main',
  entry: './src/index.js',
  output: {
    filename: './main.prod.js',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
});
