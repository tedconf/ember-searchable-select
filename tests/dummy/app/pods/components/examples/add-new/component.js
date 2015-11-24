import Ember from 'ember';

// BEGIN-SNIPPET add-new
export default Ember.Component.extend({
  classNames: 'Example',
  newItemName: null,
  talkTags: null,
  selectedTags: [],
  numTags: Ember.computed.alias('talkTags.length'),
  actions: {
    addNew(text) {
      this.set('newItemName', text);

      let newTag = {
        id: this.get('numTags'),
        tag: text
      };

      this.get('talkTags').addObject(newTag);
      this.get('selectedTags').addObject(newTag);
    }
  }
});
// END-SNIPPET
