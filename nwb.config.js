const path = require('path');

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'MiradorCurationApiPlugin',
      externals: {
        react: 'React',
      },
    },
  },
  webpack: {
    aliases: {
      '@material-ui/core': path.resolve('./', 'node_modules', '@material-ui/core'),
      '@material-ui/styles': path.resolve('./', 'node_modules', '@material-ui/styles'),
      'isomorphic-unfetch': path.resolve('./', 'node_modules', 'isomorphic-unfetch'),
      'prop-types': path.resolve('./', 'node_modules', 'prop-types'),
      react: path.resolve('./', 'node_modules', 'react'),
      'react-dom': path.resolve('./', 'node_modules', 'react-dom'),
      'react-i18next': path.resolve('./', 'node_modules', 'react-i18next'),
      'react-redux': path.resolve('./', 'node_modules', 'react-redux'),
      'redux': path.resolve('./', 'node_modules', 'redux'),
      'redux-saga': path.resolve('./', 'node_modules', 'redux-saga'),
      'reselect': path.resolve('./', 'node_modules', 'reselect'),
    },
  },
};
