(function(window, seajs, undefined) {

  'use strict';

  if (!seajs) {
    return;
  }

  seajs.config({
    base: '/',
    alias: {
      @ALIAS
    },
    map: []
  });

})(this, this.seajs);
