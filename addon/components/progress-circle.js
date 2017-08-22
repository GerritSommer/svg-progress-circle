import Ember  from 'ember';
import layout from '../templates/components/progress-circle';

const { Component, computed } = Ember;

export default Component.extend({
  layout:      layout,
  classNames:  [ 'progress-circle' ],
  percentage:  null,
  size:        90,
  strokeWidth: 10,

  SVGsize: computed(function() {
    return parseInt(this.get('size')) + 1;
  }),

  radius: computed('coordinates', function() {
    return this.get('coordinates') - parseInt(this.get('strokeWidth'));
  }),

  textYCoordinate: computed(function() {
    const strokeWidth = this.get('strokeWidth');
    return this.get('radius') - (strokeWidth * 2);
  }),

  coordinates: computed(function() {
    return this.get('size') / 2;
  }),

  zeroPercentage: computed('percentage', function() {
    return !(this.get('percentage') > 0);
  }),

  circumference: computed('radius', function() {
    return parseInt(Math.PI * (2 * this.get('radius')));
  }),

  strokeDashoffset: computed('percentage', 'radius', function() {
    let circumference = (Math.PI * (2 * this.get('radius')));
    return Math.floor(circumference - ((this.get('percentage') / 100) * circumference));
  })

});
