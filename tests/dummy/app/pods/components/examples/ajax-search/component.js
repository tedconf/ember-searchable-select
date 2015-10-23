import Ember from 'ember';

// BEGIN-SNIPPET ajax-search
export default Ember.Component.extend({
  classNames: 'Example',
  TEDevents: null,
  filteredTEDevents: null,
  setBySearchable: null,
  queryText: null,

  actions: {
    updateSelection(selection){
      this.set('setBySearchable', selection);
    },
    updateSearch(text){
      // this example filters a local data set,
      // you could also AJAX update your content here
      this.set('queryText', text);

      let regex = this.get('queryText') ? new RegExp(this.get('queryText'), 'i') : new RegExp('/S', 'i');

      let matches = this.get('TEDevents').filter(item => {
        return regex.test(item.title) || regex.test(item.keywords);
      });

      this.set('filteredTEDevents', Ember.A(matches));
    }
  }
});

// END-SNIPPET
