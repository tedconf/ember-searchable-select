import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'Example',
  setBySearchable: null,
  actions: {
    update(selection) {
      this.set('setBySearchable', selection);
    }
  }
});
