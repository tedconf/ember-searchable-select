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
  sortBy: null,
  limitSearchToWordBoundary: false,

  prompt: 'Select an option',
  searchPrompt: 'Type to search',
  noResultsMessage: 'No matching results',

  isClearable: true,
  clearLabel: 'Clear',

  addLabel: 'Add',

  isLoading: false,
  loadingMessage: 'Searching...',

  _searchText: '',
  _isShowingMenu: false,
  _isShowingClear: Ember.computed.and('isClearable', '_selected'),
  _hasNoResults: Ember.computed.empty('_filteredContent'),
  _hasResults: Ember.computed.not('_hasNoResults'),
  _isNotLoading: Ember.computed.not('isLoading'),
  _isShowingAddNew: Ember.computed.and(
    '_canAddNew',
    '_hasNoMatchedKeys',
    '_searchText'),
  _isShowingNoResultsMessage: Ember.computed.and(
    '_searchText',
    '_hasNoResults',
    '_isNotLoading'),

  'on-change': Ember.K,
  'on-add': Ember.K,
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

  _sortArray: Ember.computed('sortBy', function(){
    if (this.get('sortBy')){
      return [this.get('sortBy')];
    }
    return [];
  }),

  _sortedContent: Ember.computed.sort('content', '_sortArray'),

  _canAddNew: Ember.computed('on-add', function() {
    return this.get('on-add') !== Ember.K;
  }),

  _isFilterActive: Ember.computed('on-search', function() {
    return this.get('on-search') === Ember.K;
  }),

  _filterRegex: Ember.computed(
    'limitSearchToWordBoundary',
    '_searchText',
      function() {
      let searchText = this.get('_searchText');

      if (searchText){
        let regex = this.get('limitSearchToWordBoundary') ?
          '\\b' + searchText : searchText;
        return new RegExp(regex, 'i');
      }
    }
  ),

  _filteredContent: Ember.computed(
    '_sortedContent.[]',
    'optionLabelKey',
    '_filterRegex',
    '_isFilterActive',
  function() {
    let regex = this.get('_filterRegex'),
        content = this.get('_sortedContent');
    if (regex && this.get('_isFilterActive')) {
      return Ember.A(content.filter(item => {
        return regex.test(Ember.get(item, this.get('optionLabelKey')));
      }));
    } else {
      return content;
    }
  }),

  _filteredKeys: Ember.computed('_filteredContent', 'optionLabelKey', function() {
    return Ember.A(this.get('_filteredContent').mapBy(this.get('optionLabelKey')));
  }),

  _hasMatchedKey: Ember.computed('_filteredKeys', '_searchText', function() {
    let regex = new RegExp('^' + this.get('_searchText') + '$', 'i');

    return this.get('_filteredKeys').filter((key) => {
      return regex.test(key);
    }).length;
  }),

  _hasNoMatchedKeys: Ember.computed.not('_hasMatchedKey'),

  _teardown: Ember.on('willDestroyElement', function() {
    this._unbindOutsideClicks();
  }),

  _bindOutsideClicks: function(){
    var component = this;
    $(window).one('click.' + component.elementId, function() {
      component.send('hideMenu');
    });
  },

  _unbindOutsideClicks: function() {
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
        this._bindOutsideClicks();
      });
    },
    hideMenu(){
      this.set('_isShowingMenu', false);
      this._unbindOutsideClicks();
      this.set('_searchText', '');
    },
    clear(){
      this.send('selectItem', null);
    },
    addNew(){
      this['on-add'].call(this, this.get('_searchText'));
      this.send('hideMenu');
    },
    noop(){
      //need an action to able to attach bubbles:false to an elem
    }
  }

});
