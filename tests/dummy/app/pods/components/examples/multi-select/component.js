import Ember from 'ember';

// BEGIN-SNIPPET multiple
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
