const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '~': path.resolve('./app/' + process.env.NODE_DIR + '/dist'),
      '@': path.resolve('./app/' + process.env.NODE_DIR + '/assets'),
      '!': path.resolve('./__test__'),
      ext: path.resolve(__dirname, './app/' + process.env.NODE_DIR + '/extensions'),
      Config: path.resolve('./config/global-constants.js'),
      mockReducer: path.resolve('./__test__/mockReducer.js')
    }
  }
};
