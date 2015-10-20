import Ember from 'ember';
import layout from '../templates/components/searchable-select';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['Searchable-select'],
  classNameBindings: ['_isShowingMenu:Searchable-select--menu-open'],

  content: null,
  // optionValueKey: 'id', //do i need this? or is id a suitable default for unique key?
  optionLabelKey: 'title',
  prompt: 'Select an option',
  searchPrompt: 'Type to search',
  limitSearchToWordBoundary: true,
  sortBy: null,
  _searchText: '',
  _isShowingMenu: false,
  _selected: null,

  'on-change': Ember.K,
  'on-search': Ember.K,

  sortArray: Ember.computed('sortBy', function(){
    if (this.get('sortBy')){
      return [this.get('sortBy')];
    }
    return [];
  }),

  sortedContent: Ember.computed.sort('content', 'sortArray'),

  filterRegex: Ember.computed('limitSearchToWordBoundary', '_searchText', function() {
    let searchText = this.get('_searchText');

    if (searchText){
      let regex = this.get('limitSearchToWordBoundary') ? '\\b' + searchText : searchText;
      return new RegExp(regex, 'i');
    }
  }),

  filteredContent: Ember.computed('sortedContent', 'optionLabelKey', 'filterRegex', function() {
    let regex = this.get('filterRegex'),
        content = this.get('sortedContent');
    if (regex) {
      return content.filter(item => {
        return regex.test(Ember.get(item, this.get('optionLabelKey')));
      });
    } else {
      return content;
    }
  }),

  actions: {
    updateSearch(text){
      this.set('_searchText', text);
      this['on-search'].call(this, text);
    },
    selectItem(item){
      this.set('_selected', item);
      this['on-change'].call(this, item);
      this.toggleProperty('_isShowingMenu');
    },
    toggleMenu(){
      this.toggleProperty('_isShowingMenu');
    }
    // showMenu(){
    //   this.set('_isShowingMenu', true);
    // },
    // hideMenu(){
    //   this.set('_isShowingMenu', false);
    // }
  }

});



/* FEATURES::
  - clear option
  - ability to use keyboard controls as you would a native select (esc to close, arrows)
  - configurable search regex or at flag for search on whole string?
  - multi select
  - ajax populate list (action might be sufficient)
  - pass in initial selection
  - optional two-way binding
  - no matching results message
  - set up gh-pages for docs
*/
