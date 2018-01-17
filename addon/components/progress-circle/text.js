import Ember from 'ember';
import layout from '../../templates/components/progress-circle/text';

export default Ember.Component.extend({
  tagName: 'text',
  layout,

  attributeBindings: [
    'x',
    'y',
    'dy',
    'text-anchor',
    'alignment-baseline',
    'fill',
    'font-family',
    'font-size'
  ],

  x:                    50,
  y:                    50,
  dy:                   2.5,
  'text-anchor':        'middle',
  'alignment-baseline': 'middle',
  fill:                 'currentColor',
  'font-family':        'Arial',
  'font-size':          'initial'

});
