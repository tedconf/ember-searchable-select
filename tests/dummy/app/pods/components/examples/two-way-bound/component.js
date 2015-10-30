import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'Example',
  TEDevents: null,
  selectedOption: Ember.computed('TEDevents', function() {
    return this.get('TEDevents').findBy('title', 'TED2015');
  })
});
