import Ember from 'ember';

// BEGIN-SNIPPET example-create
export default Ember.Component.extend({
  classNames: 'Example',
  TEDevents: null,
  TEDeventsCopy: Ember.computed('TEDevents.[]', function() {
    return Ember.A(this.get('TEDevents').copy());
  }),
  selected: null,

  actions: {
    createItem(title) {
      const events = this.get('TEDeventsCopy');

      // make a new event
      const id = events.get('length') + 1;
      const event = { id, title };

      // add it
      events.addObject(event);

      // return a falsey value to disable auto selection
      // return the new event to have it selected
      return event;
    },
  }
});

// END-SNIPPET
