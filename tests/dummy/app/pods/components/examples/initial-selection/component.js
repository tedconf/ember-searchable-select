import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'Example',
  setBySearchable: null,
  TEDevents: null,
  initialSelection: Ember.computed('TEDevents', function() {
    return this.get('TEDevents').findBy('title', 'TED 2015');
  }),
  actions: {
    update(selection){
      this.set('setBySearchable', selection);
    }
  }
});
