import Ember        from 'ember';
import layout       from '../../templates/components/progress-circle/image';
import { computed } from '@ember/object';
import { guidFor }  from '@ember/object/internals';

export default Ember.Component.extend({
  tagName: '',
  layout,

  imageUrl:     null,
  strokeWidth: null,
  // The gap between the parent circle and the image
  imageGap:     0,

  uniqeID: computed({
    get() {
      return guidFor(this);
    }
  }),

  position: computed('strokeWidth', {
    get() {
      return parseInt(100 - (this.get('strokeWidth') *2));
    }
  }),

  radius: computed('strokeWidth', {
    get() {
      return 50 - (this.get('strokeWidth') * 1.5) - this.get('imageGap');
    }
  })

});
