import Ember  from 'ember';
import layout from '../templates/components/progress-circle';

const { Component, computed, computed: { not } } = Ember;

export default Component.extend({
  layout:      layout,
  classNames:  [ 'progress-circle' ],
  percentage:  null,
  // provide default sizes
  size:        90,
  strokeWidth: 10,

  indicatorClassName: computed('hasValidPercentage', 'empty', function() {
    let state;
    if ( this.get('hasInvalidPercentage') ) {
      state = 'invalid';
    } else if ( this.get('zeroPercentage') ) {
      state = 'empty';
    } else {
      state = 'filled';
    }

    return `progress-circle__indicator--${state}`;
  }),

  // Valid are all decimals and integers between 0 and 100
  hasValidPercentage: computed('percentage', function() {
    const regex = /(?:\b|-)([0-9]{1,2}[0]?|100)\b/;
    return regex.test(this.get('percentage'))
  }),

  hasInvalidPercentage: not('hasValidPercentage'),

  zeroPercentage: computed('percentage', function() {
    return parseInt('percentage') === 0;
  }),


  // Subtract the borderwidth from the radius, so the svg stays in the viewbox
  radius: computed('XYcoordinates', function() {
    return this.get('XYcoordinates') - parseInt(this.get('strokeWidth'));
  }),

  // The coordinates for the of the viewBox
  XYcoordinates: computed('size', function() {
    return this.get('size') / 2;
  }),

  // some magic calculation find out the circumferance of the circles
  circumference: computed('radius', function() {
    return parseInt(Math.PI * (2 * this.get('radius')));
  }),

  // This calculateds
  strokeDashoffset: computed('percentage', 'radius', function() {
    const circumference = this.get('circumference');
    const percentage    = this.get('hasValidPercentage') ? this.get('percentage') : 0;

    return Math.floor(circumference - ((percentage / 100) * circumference));
  })

});
