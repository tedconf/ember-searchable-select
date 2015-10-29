import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'Example',
  // setBySearchable: null,
  TEDevents: null,
  selectedOption: Ember.computed('TEDevents', function() {
    return this.get('TEDevents').findBy('title', 'TED2015');
  })
  // actions: {
  //   update(selection){
  //     this.set('setBySearchable', selection);
  //   }
  // }
});
