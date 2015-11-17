import Ember from 'ember';

// TOOD: make a proper data model for dummy data so that this demo can
// use store.createRecord instead of creating a POJO

// BEGIN-SNIPPET add-new
export default Ember.Component.extend({
  classNames: 'Example',
  newItemName: null,
  talkTags: null,
  selectedTag: null,
  numTags: Ember.computed.alias('talkTags.length'),
  actions: {
    addNew(text){
      this.set('newItemName', text);

      let newTag = {
        id: this.get('numTags'),
        tag: text
      };

      this.get('talkTags').addObject(newTag);
      this.set('selectedTag', newTag);
    }
  }
});
// END-SNIPPET
