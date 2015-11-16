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
  loadingMessage: 'Searching...',
  limitSearchToWordBoundary: false,
  isCreatable: false,
  createLabel: 'Create',
  createMatchCaseInsensitive: false,
  isClearable: true,
  clearLabel: 'Clear',
  sortBy: null,
  isLoading: false,
  _searchText: '',
  _isShowingMenu: false,
  _isShowingCreate: Ember.computed.and('isCreatable', '_searchText', '_hasNoExactMatch'),
  _isShowingClear: Ember.computed.and('isClearable', '_selected'),
  _hasNoResults: Ember.computed.empty('filteredContent'),
  _hasResults: Ember.computed.not('_hasNoResults'),
  _hasExactMatch: Ember.computed('filteredContent.[]', '_searchText', 'optionLabelKey', 'createMatchCaseInsensitive', function() {
    const path = this.get('optionLabelKey');
    const text = this.get('_searchText');
    const createMatchCaseInsensitive = this.get('createMatchCaseInsensitive');
    const content = this.get('filteredContent');

    if (!path || !text || !content) {
      return false;
    }

    return Ember.A(content).any(item => {
      if (!createMatchCaseInsensitive) {
        return Ember.get(item, path) === text;
      } else {
        return Ember.get(item, path).toLowerCase() === text.toLowerCase();
      }
    });
  }),
  _hasNoExactMatch: Ember.computed.not('_hasExactMatch'),
  _isNotLoading: Ember.computed.not('isLoading'),
  _isShowingNoResultsMessage: Ember.computed.and(
    '_searchText',
    '_hasNoResults',
    '_isNotLoading'),

  'on-create': Ember.K,
  'on-change': Ember.K,
  'on-search': Ember.K,

  // Make the passed in `selected` a one-way binding.
  // `Ember.computed.oneWay` won't pick up on upstream
  // changes after the prop gets set internally.
  _selected: Ember.computed('selected', {
    get() {
      return this.get('selected');
    },
    set(key, value) {
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
    const searchText = this.get('_searchText');

    if (searchText) {
      const regex = this.get('limitSearchToWordBoundary') ? '\\b' + searchText : searchText;
      return new RegExp(regex, 'i');
    }
  }),

  filteredContent: Ember.computed('sortedContent', 'optionLabelKey', 'filterRegex', 'isFilterActive', function() {
    const regex = this.get('filterRegex');
    const content = this.get('sortedContent');
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
    updateSearch(text) {
      this.set('_searchText', text);
      this['on-search'].call(this, text);
    },

    selectItem(item) {
      if (this.get('optionDisabledKey') && Ember.get(item, this.get('optionDisabledKey'))) {
        //item is disabled
        return;
      }
      this.set('_selected', item);
      this['on-change'].call(this, item);
      this.send('hideMenu');
    },

    toggleMenu() {
      if (this.get('_isShowingMenu')){
        this.send('hideMenu');
      } else {
        this.send('showMenu');
      }
    },

    showMenu() {
      this.set('_isShowingMenu', true);

      Ember.run.scheduleOnce('afterRender', this, function() {
        // focus search input
        this.$('.Searchable-select__input').focus();
      });

      Ember.run.next(this, function() {
        this.bindOutsideClicks();
      });
    },

    hideMenu() {
      this.set('_isShowingMenu', false);
      this.unbindOutsideClicks();
      this.set('_searchText', '');
    },

    create() {
      const text = this.get('_searchText');
      const item = this['on-create'].call(this, text);
      if (item) {
        this.send('selectItem', item);
      }
    },

    clear() {
      this.send('selectItem', null);
    },

    noop() {
      //need an action to able to attach bubbles:false to an elem
    }
  }

});


/* FEATURES::
  - pagination??
*/
