import Ember from 'ember';

// BEGIN-SNIPPET example-sort
export default Ember.Component.extend({
  classNames: 'Example',
  setBySearchable: null,
  actions: {
    update(selection) {
      this.set('setBySearchable', selection);
    }
  }
});
// END-SNIPPET
