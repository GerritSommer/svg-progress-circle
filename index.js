/* eslint-env node */
'use strict';
module.exports = {
  name: 'svg-progress-circle',

  isDevelopingAddon: function() {
    return true;
  },

  included: function(/* app */) {
    this._super.included.apply(this, arguments);
  }
};
