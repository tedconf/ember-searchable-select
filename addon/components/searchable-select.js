import Ember from 'ember';
import layout from '../templates/components/searchable-select';
/* global $ */

export default Ember.Component.extend({
  layout: layout,
  classNames: ['Searchable-select'],
  classNameBindings: ['_isShowingMenu:Searchable-select--menu-open'],

  content: null,
  selected: null,
  optionLabelKey: 'title',
  optionDisabledKey: null,
  prompt: 'Select an option',
  searchPrompt: 'Type to search',
  noResultsMessage: 'No matching results',
  limitSearchToWordBoundary: false,
  isClearable: true,
  clearLabel: 'Clear',
  sortBy: null,
  _searchText: '',
  _isShowingMenu: false,
  _isShowingClear: Ember.computed.and('isClearable', '_selected'),
  _hasNoResults: Ember.computed.empty('filteredContent'),
  _hasResults: Ember.computed.not('_hasNoResults'),
  _isShowingNoResultsMessage: Ember.computed.and('_searchText', '_hasNoResults'),

  'on-change': Ember.K,
  'on-search': Ember.K,

  // Make the passed in `selected` a one-way binding.
  // `Ember.computed.oneWay` won't pick up on upstream
  // changes after the prop gets set internally.
  _selected: Ember.computed('selected', {
    get: function() {
      return this.get('selected');
    },
    set: function(key, value){
      return value;
    }
  }),

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
      if (this.get('optionDisabledKey') && Ember.get(item, this.get('optionDisabledKey'))){
        //item is disabled
        return;
      }
      this.set('_selected', item);
      this['on-change'].call(this, item);
      this.send('hideMenu');
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

      Ember.run.scheduleOnce('afterRender', this, function() {
        // focus search input
        this.$('.Searchable-select__input').focus();
      });

      Ember.run.next(this, function() {
        this.bindOutsideClicks();
      });
    },
    hideMenu(){
      this.set('_isShowingMenu', false);
      this.unbindOutsideClicks();
      this.set('_searchText', '');
    },
    clear(){
      this.send('selectItem', null);
    },
    noop(){
      //need an action to able to attach bubbles:false to an elem
    }
  }

});


/* FEATURES::
  - pagination??
  - optional two-way binding
*/
