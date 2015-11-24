import Ember from 'ember';
import layout from '../templates/components/searchable-select';
/* global $ */

export default Ember.Component.extend({
  layout,
  classNames: ['Searchable-select'],
  classNameBindings: ['_isShowingMenu:Searchable-select--menu-open'],

  content: null,
  selected: null,
  optionLabelKey: 'title',
  optionDisabledKey: null,
  sortBy: null,
  limitSearchToWordBoundary: false,
  multiple: false,

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
  _hasSelection: Ember.computed.alias('_selectedArray.length'),
  _isShowingClear: Ember.computed.and('isClearable', '_hasSelection'),
  _hasNoResults: Ember.computed.empty('_filteredContent'),
  _hasResults: Ember.computed.not('_hasNoResults'),
  _isNotLoading: Ember.computed.not('isLoading'),
  _isSingleSelect: Ember.computed.not('multiple'),
  _hasMultipleSelection: Ember.computed.and('multiple', '_hasSelection'),
  _hasSingleSelection: Ember.computed.and('_isSingleSelect', '_hasSelection'),
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
    get() {
      return this.get('selected');
    },
    set(key, value) {
      return value;
    }
  }),

  // turn single selection values into an array so we can work with
  // both single and multiple selections consistently in the template
  _selectedArray: Ember.computed('_selected', function() {
    let _selected = this.get('_selected');

    if (_selected) {
      return Array.isArray(_selected) ? Ember.A(_selected) : Ember.A([_selected]);
    } else {
      return Ember.A([]);
    }
  }),

  _sortArray: Ember.computed('sortBy', function() {
    if (this.get('sortBy')) {
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

      if (searchText) {
        let regex = this.get('limitSearchToWordBoundary') ?
          `\\b${searchText}` : searchText;
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
    let filterRegex = this.get('_filterRegex');
    let content = this.get('_sortedContent');

    if (filterRegex && this.get('_isFilterActive')) {
      return Ember.A(content.filter(item => {
        return filterRegex.test(Ember.get(item, this.get('optionLabelKey')));
      }));
    } else {
      return content;
    }
  }),

  _filteredKeys: Ember.computed(
    '_filteredContent',
    'optionLabelKey',
    function() {
      let optKey = this.get('optionLabelKey');
      return Ember.A(this.get('_filteredContent').mapBy(optKey));
    }
  ),

  _hasMatchedKey: Ember.computed('_filteredKeys', '_searchText', function() {
    // let regex = new RegExp('^' + this.get('_searchText') + '$', 'i');
    let regex = new RegExp(`^${this.get('_searchText')}$`, 'i');

    return this.get('_filteredKeys').filter((key) => {
      return regex.test(key);
    }).length;
  }),

  _hasNoMatchedKeys: Ember.computed.not('_hasMatchedKey'),

  _setup: Ember.on('didInsertElement', function() {
    // keyboard controls

    this.$().on('keydown', e => {
      this._handleKeyboardControls(e);
    });
  }),

  _teardown: Ember.on('willDestroyElement', function() {
    this._unbindOutsideClicks();
  }),

  _bindOutsideClicks() {
    let component = this;
    $(window).one(`click.${component.elementId}`, function() {
      component.send('hideMenu');
      component.$('.Searchable-select__label').blur();
    });
  },

  _unbindOutsideClicks() {
    let component = this;
    $(window).off(`click.${component.elementId}`);
  },

  _handleKeyboardControls(e) {
    let $focussable = this.$('[tabindex]');
    let i = $focussable.index(e.target);

    if (e.keyCode === 40) {
      // down arrow
      e.preventDefault();
      $focussable.eq(i + 1).focus();

      if ($(e.target).is('.Searchable-select__label')) {
        this.send('showMenu');
      }
    } else if (e.keyCode === 38) {
      // up arrow
      e.preventDefault();
      if (i > 0) {
        $focussable.eq(i - 1).focus();
      }
    } else if (e.keyCode === 27 || e.keyCode === 9) {
      // escape key or tab key
      this.send('hideMenu');
    }
  },

  _toggleSelection(item) {
    let selectedOptions = this.get('_selectedArray');

    if (item === null) {
      selectedOptions.clear();
    } else if (selectedOptions.contains(item)) {
      selectedOptions.removeObject(item);
    } else {
      selectedOptions.addObject(item);
    }

    return selectedOptions;
  },

  actions: {
    updateSearch(text) {
      this.set('_searchText', text);
      this['on-search'].call(this, text);
    },
    selectItem(item) {
      let disabledKey = this.get('optionDisabledKey');

      if (item && disabledKey && Ember.get(item, disabledKey)) {
        // item is disabled, do nothing
        return;
      }

      if (this.get('multiple')) {
        // add or remove item from selection
        let newSelection = this._toggleSelection(item);
        this['on-change'].call(this, newSelection);
      } else {
        // replace selection
        this.set('_selected', item);
        this['on-change'].call(this, item);
      }
      this.send('hideMenu');
    },
    toggleMenu() {
      if (this.get('_isShowingMenu')) {
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
        this._bindOutsideClicks();
      });
    },
    hideMenu() {
      this.set('_isShowingMenu', false);
      this._unbindOutsideClicks();
      this.set('_searchText', '');
      this.$('.Searchable-select__label').focus();
    },
    clear() {
      this.send('selectItem', null);
    },
    removeOption(option) {
      this.get('_selectedArray').removeObject(option);
    },
    addNew() {
      this['on-add'].call(this, this.get('_searchText'));
      this.send('hideMenu');
    },
    selectItemWithEnter(option) {
      if (event.keyCode === 13) {
        this.send('selectItem', option);
      }
    },
    clearWithKeyboard(target) {
      debugger;
      if (event.keyCode === 13 ) {
        this.send('clear');
      }
    },
    addWithKeyboard() {
      if (event.keyCode === 13 ) {
        this.send('addNew');
      }
    },
    noop() {
      // need an action to able to attach bubbles:false to an elem
    }
  }

});
