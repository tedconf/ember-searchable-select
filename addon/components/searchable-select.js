import Ember from 'ember';
import layout from '../templates/components/searchable-select';
/* global $ */

export default Ember.Component.extend({
  layout: layout,
  classNames: ['Searchable-select'],
  classNameBindings: ['_isShowingMenu:Searchable-select--menu-open'],

  content: null,
  selected: null,
  // optionValueKey: 'id', //do i need this? or is id a suitable default for unique key?
  optionLabelKey: 'title',
  prompt: 'Select an option',
  searchPrompt: 'Type to search',
  limitSearchToWordBoundary: false,
  sortBy: null,
  _searchText: '',
  _isShowingMenu: false,
  _selected: Ember.computed.reads('selected'),

  'on-change': Ember.K,
  'on-search': Ember.K,

  sortArray: Ember.computed('sortBy', function(){
    if (this.get('sortBy')){
      return [this.get('sortBy')];
    }
    return [];
  }),

  sortedContent: Ember.computed.sort('content', 'sortArray'),

  isFilterActive: Ember.computed('on-search', function() {
    return this.get('on-search') === Ember.K;
  }),

  filterRegex: Ember.computed('limitSearchToWordBoundary', '_searchText', function() {
    let searchText = this.get('_searchText');

    if (searchText){
      let regex = this.get('limitSearchToWordBoundary') ? '\\b' + searchText : searchText;
      return new RegExp(regex, 'i');
    }
  }),

  filteredContent: Ember.computed('sortedContent', 'optionLabelKey', 'filterRegex', 'isFilterActive', function() {
    let regex = this.get('filterRegex'),
        content = this.get('sortedContent');
    if (regex && this.get('isFilterActive')) {
      return content.filter(item => {
        return regex.test(Ember.get(item, this.get('optionLabelKey')));
      });
    } else {
      return content;
    }
  }),

  teardown: Ember.on('willDestroyElement', function() {
    this.unbindOutsideClicks();
  }),

  bindOutsideClicks: function(){
    var component = this;
    $(window).one('click.' + component.elementId, function() {
      component.send('hideMenu');
    });
  },

  unbindOutsideClicks: function() {
    var component = this;
    $(window).off('click.' + component.elementId);
  },

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
      if (this.get('_isShowingMenu')){
        this.send('hideMenu');
      } else {
        this.send('showMenu');
      }
    },
    showMenu(){
      this.set('_isShowingMenu', true);

      Ember.run.next(this, function() {
        //focus search input
        this.$('.Searchable-select__input').focus();
        this.bindOutsideClicks();
      });
    },
    hideMenu(){
      this.set('_isShowingMenu', false);
      this.unbindOutsideClicks();
    },
    noop(){
      //need an action to able to attach bubbles:false to an elem
    }
  }

});



/* FEATURES::
  - clear option
  - ability to use keyboard controls as you would a native select
    * esc key to close
    * arrows up/down through options
  - configurable search regex or at flag for search on whole string?
  - multi select
  - ajax populate list (action might be sufficient)
  - pass in initial selection
  - optional two-way binding
  - no matching results message
  - set up gh-pages for docs
  - highlight matched text
  - make list item over-writable component (label only, outer classes etc. get auto added)
  - allow user to pass in isLoading
*/
