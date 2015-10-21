/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    snippetSearchPaths: ['app', 'tests/dummy'],
    'ember-cli-bootstrap-sassy': {
      'js': false
    },

    //TODO: put minification back in for prod
    // uglify throws a call stack size error right now
    minifyJS: {
      enabled: false
    }
  });

  /*
    This build file specifes the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
