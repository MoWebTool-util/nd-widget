(function(window, seajs, undefined) {

  'use strict';

  if (!seajs) {
    return;
  }

  seajs.config({
    base: '/',
    alias: {
      'expect.js': 'spm_modules/expect.js/0.3.1/index.js',
      'jquery': 'spm_modules/jquery/1.11.1/jquery.js'
    },
    map: []
  });

})(this, this.seajs);
