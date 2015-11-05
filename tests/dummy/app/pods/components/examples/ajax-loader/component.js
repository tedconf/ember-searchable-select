import Ember from 'ember';

// BEGIN-SNIPPET ajax-loader
export default Ember.Component.extend({
  classNames: 'Example',
  TEDevents: null,
  filteredTEDevents: null,
  setBySearchable: null,
  queryText: null,
  isLoadingEvents: false,

  actions: {
    updateSelection(selection){
      this.set('setBySearchable', selection);
    },
    updateSearch(text){
      this.set('queryText', text);
      this.set('filteredTEDevents', null);

      if (text){
        this.send('searchForEvents');
      }
    },
    searchForEvents(){
      // If you have a slow AJAX response, you can pass
      // in an `isLoading` flag to display a loader.
      // Set to true while you're fetching results...
      this.set('isLoadingEvents', true);

      let regex = this.get('queryText') ?
        new RegExp(this.get('queryText'), 'i') :
        new RegExp('/S', 'i');

      let matches = this.get('TEDevents').filter(item => {
        return regex.test(item.title) || regex.test(item.keywords);
      });

      //...then set back to false once the AJAX call resolves.

      // Here, we pretend have a slow response using .setTimeout().
      // With a real AJAX fetch this would happen in the callback or
      // promise resolution.
      window.setTimeout(() => {
        this.set('filteredTEDevents', Ember.A(matches));
        this.set('isLoadingEvents', false);
      }, 1000);
    }
  }
});

// END-SNIPPET
