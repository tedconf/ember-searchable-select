"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('dummy/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'dummy/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App = undefined;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('dummy/blueprints/ember-markdown-section', ['exports', 'ember-markdown-section/blueprints/ember-markdown-section'], function (exports, ember_markdown_section) {

	'use strict';



	exports['default'] = ember_markdown_section['default'];

});
define('dummy/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'dummy/config/environment'], function (exports, AppVersionComponent, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = AppVersionComponent['default'].extend({
    version: version,
    name: name
  });

});
define('dummy/components/code-snippet', ['exports', 'ember', 'dummy/snippets'], function (exports, Ember, Snippets) {

  'use strict';

  var Highlight = require('highlight.js');

  exports['default'] = Ember['default'].Component.extend({
    tagName: 'pre',
    classNameBindings: ['language'],
    unindent: true,

    _unindent: function _unindent(src) {
      if (!this.get('unindent')) {
        return src;
      }
      var match,
          min,
          lines = src.split("\n");
      for (var i = 0; i < lines.length; i++) {
        match = /^\s*/.exec(lines[i]);
        if (match && (typeof min === 'undefined' || min > match[0].length)) {
          min = match[0].length;
        }
      }
      if (typeof min !== 'undefined' && min > 0) {
        src = src.replace(new RegExp("(\\n|^)\\s{" + min + "}", 'g'), "$1");
      }
      return src;
    },

    source: Ember['default'].computed('name', function () {
      return this._unindent((Snippets['default'][this.get('name')] || "").replace(/^(\s*\n)*/, '').replace(/\s*$/, ''));
    }),

    didInsertElement: function didInsertElement() {
      Highlight.highlightBlock(this.get('element'));
    },

    language: Ember['default'].computed('name', function () {
      var m = /\.(\w+)$/i.exec(this.get('name'));
      if (m) {
        switch (m[1].toLowerCase()) {
          case 'js':
            return 'javascript';
          case 'hbs':
            return 'handlebars';
          case 'css':
            return 'css';
          case 'scss':
            return 'scss';
        }
      }
    })
  });

});
define('dummy/components/ember-markdown-section', ['exports', 'ember-markdown-section/components/ember-markdown-section'], function (exports, ember_markdown_section) {

	'use strict';



	exports['default'] = ember_markdown_section['default'];

});
define('dummy/components/searchable-select-option', ['exports', 'ember-searchable-select/components/searchable-select-option'], function (exports, searchable_select_option) {

	'use strict';



	exports['default'] = searchable_select_option['default'];

});
define('dummy/components/searchable-select', ['exports', 'ember-searchable-select/components/searchable-select'], function (exports, searchable_select) {

	'use strict';



	exports['default'] = searchable_select['default'];

});
define('dummy/components/ted-page-header', ['exports', 'ember-ted-docs/components/ted-page-header'], function (exports, ted_page_header) {

	'use strict';



	exports['default'] = ted_page_header['default'];

});
define('dummy/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('dummy/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('dummy/helpers/searchable-select-get', ['exports', 'ember-searchable-select/helpers/searchable-select-get'], function (exports, searchable_select_get) {

	'use strict';



	exports['default'] = searchable_select_get['default'];
	exports.searchableSelectGet = searchable_select_get.searchableSelectGet;

});
define('dummy/helpers/searchable-select-highlight-match', ['exports', 'ember-searchable-select/helpers/searchable-select-highlight-match'], function (exports, searchable_select_highlight_match) {

	'use strict';



	exports['default'] = searchable_select_highlight_match['default'];
	exports.searchableSelectHighlightMatch = searchable_select_highlight_match.searchableSelectHighlightMatch;

});
define('dummy/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'dummy/config/environment'], function (exports, initializerFactory, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = {
    name: 'App Version',
    initialize: initializerFactory['default'](name, version)
  };

});
define('dummy/initializers/export-application-global', ['exports', 'ember', 'dummy/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('dummy/pods/application/controller', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    TEDevents: Ember['default'].A([{
      id: 1,
      title: 'TED2015',
      keywords: ''
    }, {
      id: 2,
      title: 'TEDxNASA',
      keywords: '',
      isTEDxEvent: true
    }, {
      id: 3,
      title: 'TED2014',
      keywords: ''
    }, {
      id: 4,
      title: 'TEDGlobal 2014',
      keywords: ''
    }, {
      id: 5,
      title: 'TEDxNewYork',
      keywords: 'NYC',
      isTEDxEvent: true
    }, {
      id: 6,
      title: 'TEDGlobal 2013',
      keywords: ''
    }, {
      id: 7,
      title: 'TED2013',
      keywords: ''
    }]),

    talkTags: Ember['default'].A([{
      id: 1,
      tag: 'funny'
    }, {
      id: 2,
      tag: 'inspiring'
    }]),

    TEDspeakers: Ember['default'].A([{
      id: 1,
      firstName: 'Ken',
      lastName: 'Jennings',
      fullName: 'Ken Jennings'
    }, {
      id: 2,
      firstName: 'Amy',
      lastName: 'Cuddy',
      fullName: 'Amy Cuddy'
    }, {
      id: 3,
      firstName: 'Ken',
      lastName: 'Robinson',
      fullName: 'Ken Robinson'
    }, {
      id: 4,
      firstName: 'Susan',
      lastName: 'Cain',
      fullName: 'Susan Cain'
    }, {
      id: 5,
      firstName: 'Kelly',
      lastName: 'McGonigal',
      fullName: 'Kelly McGonigal'
    }, {
      id: 6,
      firstName: 'Amy',
      lastName: 'Webb',
      fullName: 'Amy Webb'
    }])
  });

});
define('dummy/pods/application/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.1",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 2
            },
            "end": {
              "line": 29,
              "column": 2
            }
          },
          "moduleName": "dummy/pods/application/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ## Installation\n\n    To get started, install this addon,  [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass), and include the ember-searchable-select styles in your app.scss.\n\n    ```\n    ember install ember-searchable-select\n    ember install ember-cli-sass\n    ```\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n    #### app.scss\n\n    ```\n    @import \"ember-searchable-select/style\";\n    ```\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n    ## Examples\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "wrong-type",
            "multiple-nodes"
          ]
        },
        "revision": "Ember@2.4.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 46,
            "column": 0
          }
        },
        "moduleName": "dummy/pods/application/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(13);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(element0,3,3);
        morphs[2] = dom.createMorphAt(element0,5,5);
        morphs[3] = dom.createMorphAt(element0,7,7);
        morphs[4] = dom.createMorphAt(element0,9,9);
        morphs[5] = dom.createMorphAt(element0,11,11);
        morphs[6] = dom.createMorphAt(element0,13,13);
        morphs[7] = dom.createMorphAt(element0,15,15);
        morphs[8] = dom.createMorphAt(element0,17,17);
        morphs[9] = dom.createMorphAt(element0,19,19);
        morphs[10] = dom.createMorphAt(element0,21,21);
        morphs[11] = dom.createMorphAt(element0,23,23);
        morphs[12] = dom.createMorphAt(element0,25,25);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["inline","ted-page-header",[],["subheading","Ember","slim-heading","Searchable ","strong-heading","Select","byline","A select-like menu with searching and filtering capabilities","github","http://github.com/tedconf/ember-searchable-select"],["loc",[null,[1,0],[6,62]]]],
        ["block","ember-markdown-section",[],[],0,null,["loc",[null,[10,2],[29,29]]]],
        ["inline","examples/example-default",[],["TEDevents",["subexpr","@mut",[["get","TEDevents",["loc",[null,[31,39],[31,48]]]]],[],[]]],["loc",[null,[31,2],[31,50]]]],
        ["inline","examples/initial-selection",[],["TEDevents",["subexpr","@mut",[["get","TEDevents",["loc",[null,[32,41],[32,50]]]]],[],[]]],["loc",[null,[32,2],[32,52]]]],
        ["inline","examples/example-sort",[],["TEDspeakers",["subexpr","@mut",[["get","TEDspeakers",["loc",[null,[33,38],[33,49]]]]],[],[]]],["loc",[null,[33,2],[33,51]]]],
        ["inline","examples/example-disabled",[],["TEDevents",["subexpr","@mut",[["get","TEDevents",["loc",[null,[34,40],[34,49]]]]],[],[]]],["loc",[null,[34,2],[34,51]]]],
        ["inline","examples/word-boundary",[],["TEDevents",["subexpr","@mut",[["get","TEDevents",["loc",[null,[35,37],[35,46]]]]],[],[]]],["loc",[null,[35,2],[35,48]]]],
        ["inline","examples/multi-select",[],["TEDevents",["subexpr","@mut",[["get","TEDevents",["loc",[null,[36,36],[36,45]]]]],[],[]]],["loc",[null,[36,2],[36,47]]]],
        ["inline","examples/add-new",[],["talkTags",["subexpr","@mut",[["get","talkTags",["loc",[null,[37,30],[37,38]]]]],[],[]]],["loc",[null,[37,2],[37,40]]]],
        ["inline","examples/ajax-search",[],["TEDevents",["subexpr","@mut",[["get","TEDevents",["loc",[null,[38,35],[38,44]]]]],[],[]]],["loc",[null,[38,2],[38,46]]]],
        ["inline","examples/ajax-loader",[],["TEDevents",["subexpr","@mut",[["get","TEDevents",["loc",[null,[39,35],[39,44]]]]],[],[]]],["loc",[null,[39,2],[39,46]]]],
        ["inline","examples/two-way-bound",[],["TEDevents",["subexpr","@mut",[["get","TEDevents",["loc",[null,[40,37],[40,46]]]]],[],[]]],["loc",[null,[40,2],[40,48]]]],
        ["content","options-table",["loc",[null,[42,2],[42,19]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('dummy/pods/components/examples/add-new/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: 'Example',
    newItemName: null,
    talkTags: null,
    selectedTags: [],
    numTags: Ember['default'].computed.alias('talkTags.length'),
    actions: {
      addNew: function addNew(text) {
        this.set('newItemName', text);

        var newTag = {
          id: this.get('numTags'),
          tag: text
        };

        this.get('talkTags').addObject(newTag);
        this.get('selectedTags').addObject(newTag);
      }
    }
  });
  // END-SNIPPET

});
define('dummy/pods/components/examples/add-new/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "multiple-nodes"
          ]
        },
        "revision": "Ember@2.4.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 28,
            "column": 6
          }
        },
        "moduleName": "dummy/pods/components/examples/add-new/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Allowing new item creation");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("You can allow users to add a new item when no match is found by specifying an action for ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("on-add");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(". The typed text gets sent with the action as a parameter. Works with both single and multi select. You will need to handle updating the content array and the current selection on your own.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("The \"Add \" text can be customized with the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("addLabel");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" option.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-6 Example--add-new");
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [8]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(element1,1,1);
        morphs[1] = dom.createMorphAt(element1,3,3);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [3]),2,2);
        return morphs;
      },
      statements: [
        ["inline","code-snippet",[],["name","add-new.hbs"],["loc",[null,[9,4],[9,39]]]],
        ["inline","code-snippet",[],["name","add-new.js"],["loc",[null,[11,4],[11,38]]]],
        ["inline","searchable-select",[],["content",["subexpr","@mut",[["get","talkTags",["loc",[null,[17,12],[17,20]]]]],[],[]],"sortBy","name","optionLabelKey","tag","multiple",true,"selected",["subexpr","@mut",[["get","selectedTags",["loc",[null,[21,13],[21,25]]]]],[],[]],"prompt","Select tags","on-add",["subexpr","action",["addNew"],[],["loc",[null,[23,11],[23,28]]]]],["loc",[null,[16,2],[23,30]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/pods/components/examples/ajax-loader/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: 'Example',
    TEDevents: null,
    filteredTEDevents: null,
    setBySearchable: null,
    queryText: null,
    isLoadingEvents: false,

    actions: {
      updateSelection: function updateSelection(selection) {
        this.set('setBySearchable', selection);
      },
      updateSearch: function updateSearch(text) {
        this.set('queryText', text);
        this.set('filteredTEDevents', null);

        if (text) {
          this.send('searchForEvents');
        }
      },
      searchForEvents: function searchForEvents() {
        var _this = this;

        // If you have a slow AJAX response, you can pass
        // in an `isLoading` flag to display a loader.
        // Set to true while you're fetching results...
        this.set('isLoadingEvents', true);

        var regex = this.get('queryText') ? new RegExp(this.get('queryText'), 'i') : new RegExp('/S', 'i');

        var matches = this.get('TEDevents').filter(function (item) {
          return regex.test(item.title) || regex.test(item.keywords);
        });

        // ...then set back to false once the AJAX call resolves.

        // Here, we pretend have a slow response using .setTimeout().
        // With a real AJAX fetch this would happen in the callback or
        // promise resolution.
        window.setTimeout(function () {
          _this.set('filteredTEDevents', Ember['default'].A(matches));
          _this.set('isLoadingEvents', false);
        }, 1000);
      }
    }
  });

  // END-SNIPPET

});
define('dummy/pods/components/examples/ajax-loader/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "multiple-nodes"
          ]
        },
        "revision": "Ember@2.4.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 28,
            "column": 6
          }
        },
        "moduleName": "dummy/pods/components/examples/ajax-loader/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Loading state");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("You may want to trigger a loading state on the menu when using your own ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("on-search");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" action with an AJAX fetch. To do this, pass in your own boolean `isLoading` property. When set to true, a loader animation will display. It will disappear when false. You can customize the loading message with the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("loadingMessage");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" property.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Note that with a slow AJAX search you might want to debounce your requests to fire less than every ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("on-search");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("event.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-6");
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Query text: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Set by Searchable: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [8]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element0, [3]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(element1,1,1);
        morphs[1] = dom.createMorphAt(element1,3,3);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [2]),1,1);
        morphs[3] = dom.createMorphAt(element2,4,4);
        morphs[4] = dom.createMorphAt(dom.childAt(element2, [6]),1,1);
        return morphs;
      },
      statements: [
        ["inline","code-snippet",[],["name","ajax-loader.hbs"],["loc",[null,[8,4],[8,43]]]],
        ["inline","code-snippet",[],["name","ajax-loader.js"],["loc",[null,[10,4],[10,42]]]],
        ["content","queryText",["loc",[null,[15,17],[15,30]]]],
        ["inline","searchable-select",[],["content",["subexpr","@mut",[["get","filteredTEDevents",["loc",[null,[18,12],[18,29]]]]],[],[]],"sortBy","title","on-change",["subexpr","action",["updateSelection"],[],["loc",[null,[20,14],[20,40]]]],"on-search",["subexpr","action",["updateSearch"],[],["loc",[null,[21,14],[21,37]]]],"isLoading",["subexpr","@mut",[["get","isLoadingEvents",["loc",[null,[22,14],[22,29]]]]],[],[]]],["loc",[null,[17,2],[22,31]]]],
        ["content","setBySearchable.title",["loc",[null,[24,24],[24,49]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/pods/components/examples/ajax-search/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: 'Example',
    TEDevents: null,
    filteredTEDevents: null,
    setBySearchable: null,
    queryText: null,

    actions: {
      updateSelection: function updateSelection(selection) {
        this.set('setBySearchable', selection);
      },
      updateSearch: function updateSearch(text) {
        // this example filters a local data set,
        // you could also AJAX update your content here
        this.set('queryText', text);

        var regex = this.get('queryText') ? new RegExp(this.get('queryText'), 'i') : new RegExp('/S', 'i');

        var matches = this.get('TEDevents').filter(function (item) {
          return regex.test(item.title) || regex.test(item.keywords);
        });

        this.set('filteredTEDevents', Ember['default'].A(matches));
      },
      clearResultsList: function clearResultsList() {
        this.set('filteredTEDevents', null);
      }
    }
  });

  // END-SNIPPET

});
define('dummy/pods/components/examples/ajax-search/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "multiple-nodes"
          ]
        },
        "revision": "Ember@2.4.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 28,
            "column": 6
          }
        },
        "moduleName": "dummy/pods/components/examples/ajax-search/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Custom filters or AJAX populating content");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("You can capture the search text outside the select by setting an ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("on-search");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" action. This allows you to do things like populate the content array via AJAX, or use a custom filter on your data set (eg. that searched on additional properties). Note that passing in an action implies you're handling filtering on your own and will disable the addon's internal filter.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("eg. Try typing 'NYC' in the search below.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-6");
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Query text: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Set by Searchable: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [8]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element0, [3]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(element1,1,1);
        morphs[1] = dom.createMorphAt(element1,3,3);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [2]),1,1);
        morphs[3] = dom.createMorphAt(element2,4,4);
        morphs[4] = dom.createMorphAt(dom.childAt(element2, [6]),1,1);
        return morphs;
      },
      statements: [
        ["inline","code-snippet",[],["name","ajax-search.hbs"],["loc",[null,[8,4],[8,43]]]],
        ["inline","code-snippet",[],["name","ajax-search.js"],["loc",[null,[10,4],[10,42]]]],
        ["content","queryText",["loc",[null,[15,17],[15,30]]]],
        ["inline","searchable-select",[],["content",["subexpr","@mut",[["get","filteredTEDevents",["loc",[null,[18,12],[18,29]]]]],[],[]],"sortBy","title","on-change",["subexpr","action",["updateSelection"],[],["loc",[null,[20,14],[20,40]]]],"on-search",["subexpr","action",["updateSearch"],[],["loc",[null,[21,14],[21,37]]]],"on-close",["subexpr","action",["clearResultsList"],[],["loc",[null,[22,13],[22,40]]]]],["loc",[null,[17,2],[22,42]]]],
        ["content","setBySearchable.title",["loc",[null,[24,24],[24,49]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/pods/components/examples/example-default/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: 'Example',
    setBySearchable: null,
    actions: {
      update: function update(selection) {
        this.set('setBySearchable', selection);
      }
    }
  });
  // END-SNIPPET

});
define('dummy/pods/components/examples/example-default/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "multiple-nodes"
          ]
        },
        "revision": "Ember@2.4.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 22,
            "column": 6
          }
        },
        "moduleName": "dummy/pods/components/examples/example-default/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Standard usage");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Searchable select is data-down, actions up by default. This means there is no automatic two-way binding and you will need to update the selected value elsewhere in your app by using the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("on-change");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" action. The selected object gets passed to your on-change action as an argument.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-6 Example--default");
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Set by Searchable: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [6]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element0, [3]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(element1,1,1);
        morphs[1] = dom.createMorphAt(element1,3,3);
        morphs[2] = dom.createMorphAt(element2,2,2);
        morphs[3] = dom.createMorphAt(dom.childAt(element2, [4]),1,1);
        return morphs;
      },
      statements: [
        ["inline","code-snippet",[],["name","default.hbs"],["loc",[null,[6,4],[6,39]]]],
        ["inline","code-snippet",[],["name","example-default.js"],["loc",[null,[8,4],[8,46]]]],
        ["inline","searchable-select",[],["content",["subexpr","@mut",[["get","TEDevents",["loc",[null,[14,12],[14,21]]]]],[],[]],"sortBy","title","on-change",["subexpr","action",["update"],[],["loc",[null,[16,14],[16,31]]]]],["loc",[null,[13,2],[16,33]]]],
        ["content","setBySearchable.title",["loc",[null,[18,24],[18,49]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/pods/components/examples/example-disabled/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: 'Example',
    setBySearchable: null,
    actions: {
      update: function update(selection) {
        this.set('setBySearchable', selection);
      }
    }
  });
  // END-SNIPPET

});
define('dummy/pods/components/examples/example-disabled/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "multiple-nodes"
          ]
        },
        "revision": "Ember@2.4.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 21,
            "column": 6
          }
        },
        "moduleName": "dummy/pods/components/examples/example-disabled/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Disabled options");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Just like a real select menu, you can disable menu items. Pass in a item key to use as a flag; when true the item will not be selectable. If you don't have an existing model key that evaluates to true/false, you can set up a computed property on the content model that returns a boolean value.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-6");
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Set by Searchable: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [6]);
        var element1 = dom.childAt(element0, [3]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),1,1);
        morphs[1] = dom.createMorphAt(element1,2,2);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [4]),1,1);
        return morphs;
      },
      statements: [
        ["inline","code-snippet",[],["name","disabled.hbs"],["loc",[null,[6,4],[6,40]]]],
        ["inline","searchable-select",[],["content",["subexpr","@mut",[["get","TEDevents",["loc",[null,[12,12],[12,21]]]]],[],[]],"sortBy","title","optionDisabledKey","isTEDxEvent","on-change",["subexpr","action",["update"],[],["loc",[null,[15,14],[15,31]]]]],["loc",[null,[11,2],[15,33]]]],
        ["content","setBySearchable.title",["loc",[null,[17,24],[17,49]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/pods/components/examples/example-sort/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: 'Example',
    setBySearchable: null,
    actions: {
      update: function update(selection) {
        this.set('setBySearchable', selection);
      }
    }
  });
  // END-SNIPPET

});
define('dummy/pods/components/examples/example-sort/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": [
              "wrong-type"
            ]
          },
          "revision": "Ember@2.4.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "dummy/pods/components/examples/example-sort/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("### Sorting the list\n\nYou can sort the list by a single property (as seen in the examples above) or multiple comma-separated properties as shown here. You can also use the `:desc` qualifier to reverse sort order on a property, similar to [Ember.computed.sort](http://emberjs.com/api/classes/Ember.computed.html#method_sort).\n\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "wrong-type",
            "multiple-nodes"
          ]
        },
        "revision": "Ember@2.4.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 26,
            "column": 6
          }
        },
        "moduleName": "dummy/pods/components/examples/example-sort/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-6");
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Set by Searchable: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [4]);
        var element1 = dom.childAt(element0, [3]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1]),1,1);
        morphs[2] = dom.createMorphAt(element1,2,2);
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [4]),1,1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["block","ember-markdown-section",[],[],0,null,["loc",[null,[1,0],[6,27]]]],
        ["inline","code-snippet",[],["name","example-sort.hbs"],["loc",[null,[11,4],[11,44]]]],
        ["inline","searchable-select",[],["content",["subexpr","@mut",[["get","TEDspeakers",["loc",[null,[17,12],[17,23]]]]],[],[]],"sortBy","firstName,lastName:desc","optionLabelKey","fullName","on-change",["subexpr","action",["update"],[],["loc",[null,[20,14],[20,31]]]]],["loc",[null,[16,2],[20,33]]]],
        ["content","setBySearchable.fullName",["loc",[null,[22,24],[22,52]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('dummy/pods/components/examples/initial-selection/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: 'Example',
    setBySearchable: null,
    TEDevents: null,
    initialSelection: Ember['default'].computed('TEDevents', function () {
      return this.get('TEDevents').findBy('title', 'TED2015');
    }),
    actions: {
      update: function update(selection) {
        this.set('setBySearchable', selection);
      }
    }
  });

});
define('dummy/pods/components/examples/initial-selection/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "multiple-nodes"
          ]
        },
        "revision": "Ember@2.4.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 22,
            "column": 6
          }
        },
        "moduleName": "dummy/pods/components/examples/initial-selection/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Pass in an inital selection");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("You can set an initial selection by passing in one of the objects from the content array. This value will *not* be two-way bound and therefore, not mutated by the select component. It's up to you to sync up data outside the select by responding to the on-change action.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-6 Example--initial-selection");
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Initial selection: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Set by Searchable: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [4]);
        var element1 = dom.childAt(element0, [3]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),1,1);
        morphs[1] = dom.createMorphAt(element1,2,2);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [4]),1,1);
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [6]),1,1);
        return morphs;
      },
      statements: [
        ["inline","code-snippet",[],["name","initial-selection.hbs"],["loc",[null,[5,4],[5,49]]]],
        ["inline","searchable-select",[],["content",["subexpr","@mut",[["get","TEDevents",["loc",[null,[12,12],[12,21]]]]],[],[]],"sortBy","title","selected",["subexpr","@mut",[["get","initialSelection",["loc",[null,[14,13],[14,29]]]]],[],[]],"on-change",["subexpr","action",["update"],[],["loc",[null,[15,14],[15,31]]]]],["loc",[null,[11,2],[15,33]]]],
        ["content","initialSelection.title",["loc",[null,[17,24],[17,50]]]],
        ["content","setBySearchable.title",["loc",[null,[18,24],[18,49]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/pods/components/examples/multi-select/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: 'Example',
    setBySearchable: null,
    actions: {
      update: function update(selection) {
        this.set('setBySearchable', selection);
      }
    }
  });
  // END-SNIPPET

});
define('dummy/pods/components/examples/multi-select/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": [
              "wrong-type"
            ]
          },
          "revision": "Ember@2.4.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "dummy/pods/components/examples/multi-select/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("### Multiple select\n\nSetting `multiple=true` will put the menu into multi-select mode. Selected options are displayed as pills that can be individually removed. When in multi-select mode, 'on-change' sends an array of objects as an argument, rather than a single object.\n\nWhen combined with new item creation (below), searchable-select can be used as a tagging UI component.\n\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.1",
          "loc": {
            "source": null,
            "start": {
              "line": 26,
              "column": 4
            },
            "end": {
              "line": 28,
              "column": 4
            }
          },
          "moduleName": "dummy/pods/components/examples/multi-select/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
          return morphs;
        },
        statements: [
          ["content","selection.title",["loc",[null,[27,10],[27,29]]]]
        ],
        locals: ["selection"],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "wrong-type",
            "multiple-nodes"
          ]
        },
        "revision": "Ember@2.4.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 33,
            "column": 6
          }
        },
        "moduleName": "dummy/pods/components/examples/multi-select/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-6");
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Set by Searchable:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("  ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [3]);
        var element1 = dom.childAt(element0, [3]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1]),1,1);
        morphs[2] = dom.createMorphAt(element1,2,2);
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [6]),1,1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["block","ember-markdown-section",[],[],0,null,["loc",[null,[1,0],[8,27]]]],
        ["inline","code-snippet",[],["name","multiple.hbs"],["loc",[null,[12,4],[12,40]]]],
        ["inline","searchable-select",[],["content",["subexpr","@mut",[["get","TEDevents",["loc",[null,[18,12],[18,21]]]]],[],[]],"sortBy","title","multiple",true,"prompt","Choose events","on-change",["subexpr","action",["update"],[],["loc",[null,[22,14],[22,31]]]]],["loc",[null,[17,2],[22,33]]]],
        ["block","each",[["get","setBySearchable",["loc",[null,[26,12],[26,27]]]]],[],1,null,["loc",[null,[26,4],[28,13]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('dummy/pods/components/examples/two-way-bound/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: 'Example',
    TEDevents: null,
    selectedOption: Ember['default'].computed('TEDevents', function () {
      return this.get('TEDevents').findBy('title', 'TED2015');
    })
  });

});
define('dummy/pods/components/examples/two-way-bound/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": [
              "wrong-type"
            ]
          },
          "revision": "Ember@2.4.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 0
            }
          },
          "moduleName": "dummy/pods/components/examples/two-way-bound/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("### Two-way bound\n\nAlthough data-down, actions-up is the recommended usage, you can force a two-way binding with [Ember's `mut` helper](http://emberjs.com/blog/2015/05/10/run-up-to-two-oh.html#toc_the-code-mut-code-helper). Instead of passing in an action name to `on-change`, pass in something like `(mut boundValue)`.\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "wrong-type",
            "multiple-nodes"
          ]
        },
        "revision": "Ember@2.4.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 24,
            "column": 6
          }
        },
        "moduleName": "dummy/pods/components/examples/two-way-bound/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-6");
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Selected option (bound): ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(element0, [3]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1]),1,1);
        morphs[2] = dom.createMorphAt(element1,2,2);
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [4]),1,1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["block","ember-markdown-section",[],[],0,null,["loc",[null,[1,0],[5,27]]]],
        ["inline","code-snippet",[],["name","two-way.hbs"],["loc",[null,[8,4],[8,39]]]],
        ["inline","searchable-select",[],["content",["subexpr","@mut",[["get","TEDevents",["loc",[null,[15,12],[15,21]]]]],[],[]],"sortBy","title","selected",["subexpr","@mut",[["get","selectedOption",["loc",[null,[17,13],[17,27]]]]],[],[]],"on-change",["subexpr","action",[["subexpr","mut",[["get","selectedOption",["loc",[null,[18,27],[18,41]]]]],[],["loc",[null,[18,22],[18,42]]]]],[],["loc",[null,[18,14],[18,43]]]]],["loc",[null,[14,2],[18,45]]]],
        ["content","selectedOption.title",["loc",[null,[20,30],[20,54]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('dummy/pods/components/examples/word-boundary/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: 'Example',
    setBySearchable: null,
    actions: {
      update: function update(selection) {
        this.set('setBySearchable', selection);
      }
    }
  });

});
define('dummy/pods/components/examples/word-boundary/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "multiple-nodes"
          ]
        },
        "revision": "Ember@2.4.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 0
          }
        },
        "moduleName": "dummy/pods/components/examples/word-boundary/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Limit search to word boundary");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-6");
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Set by Searchable: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(element0, [3]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),1,1);
        morphs[1] = dom.createMorphAt(element1,2,2);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [4]),1,1);
        return morphs;
      },
      statements: [
        ["inline","code-snippet",[],["name","word-boundary.hbs"],["loc",[null,[5,4],[5,45]]]],
        ["inline","searchable-select",[],["content",["subexpr","@mut",[["get","TEDevents",["loc",[null,[11,12],[11,21]]]]],[],[]],"sortBy","title","on-change",["subexpr","action",["update"],[],["loc",[null,[13,14],[13,31]]]],"limitSearchToWordBoundary",true],["loc",[null,[10,2],[14,36]]]],
        ["content","setBySearchable.title",["loc",[null,[16,24],[16,49]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/pods/components/options-table/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: 'Options-table'
  });

});
define('dummy/pods/components/options-table/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 4
            },
            "end": {
              "line": 29,
              "column": 4
            }
          },
          "moduleName": "dummy/pods/components/options-table/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ## Configurable options\n\n    Option | Description | Type | Default value\n    --- | --- | ---\n    content                   | An array of objects used to populate the list.    | Ember.A()   | null\n    selected                  | Pass in an initial selection or update the selection when outside data has changed. Must be an object from the content array for single select or an array of options for multi-select.     | Object    | null\n    on-change                 | Specify your own named action to trigger when the selection changes. eg. ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("code");
          var el2 = dom.createTextNode("(action \"update\")");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" For single selection (default behaviour), the selected object is sent as an argument. For multiple selections, an array of options is sent. | Ember action  | null\n    optionLabelKey            | The item property to use as the visible label in the menu.   | string  | 'title'\n    optionDisabledKey         | Provide a boolean item property to use a flag for disabling menu items. [optional] | string, null  | null\n    sortBy                    | The item property to use for a sort key. Accepts a single property or a comma separated list. Also allows the use of the `:desc` qualifier for reversing sort order. Sorting is disabled when set to null. ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("eg. `sortBy:title`, `sortBy=\"firstName,lastName\"`, `sortBy=\"year:desc\"` | string, null  | null\n    limitSearchToWordBoundary | When true, search will only match the beginning of words     | boolean     | true\n    multiple                  | Set to true to enable multiple selection. You must use an array for `selected` in mutli-select mode. | boolean | false\n    closeOnSelection          | Set to false to disabled automatically closing the menu once a selection is made. | boolean | true \n    prompt                    | Prompt text for the main input.    | string    | 'Select an option'\n    searchPrompt              | Prompt text for the search input.    | string    | 'Type to search'\n    noResultsMessage          | Message to display if a filter produces no results    | string    | 'No matching results'\n    isClearable               | When true, a clear button is available to clear the input and remove any selection that has been made.     | boolean     | true\n    clearLabel                | Text to display beside the clear button when `isClearable` is true. | string    | 'Clear selection'\n    on-add                    | Allow unfound items to be added to the content array by specifying your own named action. eg. `(action \"addNew\")` The new item name is sent as an argument. You must handle adding the item to the content array and selecting the new item outside the component. | Ember action  | null\n    addLabel                  | Text to show before the new text to be added when an `on-add` action is provided. | string    | 'Add'\n    on-search                 | Specify your own named action to trigger when the search text  changes. eg. ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("code");
          var el2 = dom.createTextNode("(action \"search\")");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("The search text is sent as an argument. Useful for custom filtering or AJAX search. The component's internal filter is automatically disabled when an on-search action is provided.     | Ember action    | null\n    isLoading                 | Pass in your own boolean flag to toggle visibility of a loading animation.     | boolean     | false\n    loadingMessage            | Text to displayed beside the loading animation when `isLoading` is true.    | string    | 'Searching...'\n    on-open                  | Specify your own named action to trigger when the menu opens. Useful if you opt not to auto close the menu when a selection is made and you'd like to hold off on propagating changes until the menu closes. | Ember action | null\n    on-close                  | Specify your own named action to trigger when the menu closes. Useful hook for clearing out content that was previously passed in with AJAX. | Ember action | null\n\n\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "wrong-type"
          ]
        },
        "revision": "Ember@2.4.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 29,
            "column": 31
          }
        },
        "moduleName": "dummy/pods/components/options-table/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","ember-markdown-section",[],[],0,null,["loc",[null,[1,4],[29,31]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('dummy/router', ['exports', 'ember', 'dummy/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {});

  exports['default'] = Router;

});
define('dummy/snippets', ['exports'], function (exports) {

  'use strict';

  exports['default'] = {
    "add-new.hbs": "  {{searchable-select\n    content=talkTags\n    sortBy=\"name\"\n    optionLabelKey=\"tag\"\n    multiple=true\n    selected=selectedTags\n    prompt=\"Select tags\"\n    on-add=(action \"addNew\")}}\n",
    "add-new.js": "export default Ember.Component.extend({\n  classNames: 'Example',\n  newItemName: null,\n  talkTags: null,\n  selectedTags: [],\n  numTags: Ember.computed.alias('talkTags.length'),\n  actions: {\n    addNew(text) {\n      this.set('newItemName', text);\n\n      let newTag = {\n        id: this.get('numTags'),\n        tag: text\n      };\n\n      this.get('talkTags').addObject(newTag);\n      this.get('selectedTags').addObject(newTag);\n    }\n  }\n});",
    "ajax-loader.hbs": "  <p>Query text: {{queryText}}</p>\n\n  {{searchable-select\n    content=filteredTEDevents\n    sortBy=\"title\"\n    on-change=(action \"updateSelection\")\n    on-search=(action \"updateSearch\")\n    isLoading=isLoadingEvents}}\n\n  <p>Set by Searchable: {{setBySearchable.title}}</p>",
    "ajax-loader.js": "export default Ember.Component.extend({\n  classNames: 'Example',\n  TEDevents: null,\n  filteredTEDevents: null,\n  setBySearchable: null,\n  queryText: null,\n  isLoadingEvents: false,\n\n  actions: {\n    updateSelection(selection) {\n      this.set('setBySearchable', selection);\n    },\n    updateSearch(text) {\n      this.set('queryText', text);\n      this.set('filteredTEDevents', null);\n\n      if (text) {\n        this.send('searchForEvents');\n      }\n    },\n    searchForEvents() {\n      // If you have a slow AJAX response, you can pass\n      // in an `isLoading` flag to display a loader.\n      // Set to true while you're fetching results...\n      this.set('isLoadingEvents', true);\n\n      let regex = this.get('queryText') ?\n        new RegExp(this.get('queryText'), 'i') :\n        new RegExp('/S', 'i');\n\n      let matches = this.get('TEDevents').filter(item => {\n        return regex.test(item.title) || regex.test(item.keywords);\n      });\n\n      // ...then set back to false once the AJAX call resolves.\n\n      // Here, we pretend have a slow response using .setTimeout().\n      // With a real AJAX fetch this would happen in the callback or\n      // promise resolution.\n      window.setTimeout(() => {\n        this.set('filteredTEDevents', Ember.A(matches));\n        this.set('isLoadingEvents', false);\n      }, 1000);\n    }\n  }\n});\n",
    "ajax-search.hbs": "  <p>Query text: {{queryText}}</p>\n\n  {{searchable-select\n    content=filteredTEDevents\n    sortBy=\"title\"\n    on-change=(action \"updateSelection\")\n    on-search=(action \"updateSearch\")\n    on-close=(action \"clearResultsList\")}}\n\n  <p>Set by Searchable: {{setBySearchable.title}}</p>",
    "ajax-search.js": "export default Ember.Component.extend({\n  classNames: 'Example',\n  TEDevents: null,\n  filteredTEDevents: null,\n  setBySearchable: null,\n  queryText: null,\n\n  actions: {\n    updateSelection(selection) {\n      this.set('setBySearchable', selection);\n    },\n    updateSearch(text) {\n      // this example filters a local data set,\n      // you could also AJAX update your content here\n      this.set('queryText', text);\n\n      let regex = this.get('queryText') ?\n        new RegExp(this.get('queryText'), 'i') :\n        new RegExp('/S', 'i');\n\n      let matches = this.get('TEDevents').filter(item => {\n        return regex.test(item.title) || regex.test(item.keywords);\n      });\n\n      this.set('filteredTEDevents', Ember.A(matches));\n    },\n    clearResultsList() {\n      this.set('filteredTEDevents', null);\n    }\n  }\n});\n",
    "default.hbs": "  {{searchable-select\n    content=TEDevents\n    sortBy=\"title\"\n    on-change=(action \"update\")}}\n\n  <p>Set by Searchable: {{setBySearchable.title}}</p>",
    "disabled.hbs": "  {{searchable-select\n    content=TEDevents\n    sortBy=\"title\"\n    optionDisabledKey=\"isTEDxEvent\"\n    on-change=(action \"update\")}}\n\n  <p>Set by Searchable: {{setBySearchable.title}}</p>",
    "example-default.js": "export default Ember.Component.extend({\n  classNames: 'Example',\n  setBySearchable: null,\n  actions: {\n    update(selection) {\n      this.set('setBySearchable', selection);\n    }\n  }\n});",
    "example-sort.hbs": "  {{searchable-select\n    content=TEDspeakers\n    sortBy=\"firstName,lastName:desc\"\n    optionLabelKey=\"fullName\"\n    on-change=(action \"update\")}}\n\n  <p>Set by Searchable: {{setBySearchable.fullName}}</p>",
    "example-sort.js": "export default Ember.Component.extend({\n  classNames: 'Example',\n  setBySearchable: null,\n  actions: {\n    update(selection) {\n      this.set('setBySearchable', selection);\n    }\n  }\n});",
    "initial-selection.hbs": "\n  {{searchable-select\n    content=TEDevents\n    sortBy=\"title\"\n    selected=initialSelection\n    on-change=(action \"update\")}}\n\n  <p>Initial selection: {{initialSelection.title}}</p>\n  <p>Set by Searchable: {{setBySearchable.title}}</p>",
    "multiple.hbs": "  {{searchable-select\n    content=TEDevents\n    sortBy=\"title\"\n    multiple=true\n    prompt=\"Choose events\"\n    on-change=(action \"update\")}}\n\n  <p>Set by Searchable:</p>\n  <ul>\n    {{#each setBySearchable as |selection|}}\n      <li>{{selection.title}}</li>\n    {{/each}}\n  </ul>",
    "multiple.js": "export default Ember.Component.extend({\n  classNames: 'Example',\n  setBySearchable: null,\n  actions: {\n    update(selection) {\n      this.set('setBySearchable', selection);\n    }\n  }\n});",
    "two-way.hbs": "\n  {{searchable-select\n    content=TEDevents\n    sortBy=\"title\"\n    selected=selectedOption\n    on-change=(action (mut selectedOption))}}\n\n  <p>Selected option (bound): {{selectedOption.title}}</p>",
    "word-boundary.hbs": "  {{searchable-select\n    content=TEDevents\n    sortBy=\"title\"\n    on-change=(action \"update\")\n    limitSearchToWordBoundary=true}}\n\n  <p>Set by Searchable: {{setBySearchable.title}}</p>"
  };

});
define('dummy/templates/components/code-snippet', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "wrong-type"
          ]
        },
        "revision": "Ember@2.4.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/components/code-snippet.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","source",["loc",[null,[1,0],[1,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/templates/components/ted-page-header', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.1",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 2
            },
            "end": {
              "line": 11,
              "column": 2
            }
          },
          "moduleName": "dummy/templates/components/ted-page-header.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          dom.setAttribute(el1,"class","tph-Banner__link pull-right");
          var el2 = dom.createTextNode("\n    GitHub\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createAttrMorph(element0, 'href');
          return morphs;
        },
        statements: [
          ["attribute","href",["concat",[["get","github",["loc",[null,[8,13],[8,19]]]]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "multiple-nodes"
          ]
        },
        "revision": "Ember@2.4.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 24,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/components/ted-page-header.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","tph-Banner container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","https://tedconf.github.io/");
        dom.setAttribute(el2,"class","tph-Banner__link");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("img");
        dom.setAttribute(el3,"class","tph-Banner__ted-logo");
        dom.setAttribute(el3,"src","ember-ted-docs/images/ted-a8a21ac3b1ddc03b6aa53267b70944f0.png");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        dom.setAttribute(el3,"class","tph-Banner__slim-logo");
        var el4 = dom.createTextNode("Open");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        dom.setAttribute(el3,"class","tph-Banner__strong-logo");
        var el4 = dom.createTextNode("Source");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("header");
        dom.setAttribute(el1,"class","tph-Header");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","container");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        dom.setAttribute(el3,"class","tph-Header__subheading");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        dom.setAttribute(el3,"class","tph-Header__heading");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4,"class","tph-Header__slim-heading");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4,"class","tph-Header__strong-heading");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3,"class","tph-Header__text");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [2, 1]);
        var element2 = dom.childAt(element1, [3]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),3,3);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
        morphs[3] = dom.createMorphAt(dom.childAt(element2, [2]),0,0);
        morphs[4] = dom.createMorphAt(dom.childAt(element1, [5]),0,0);
        morphs[5] = dom.createMorphAt(element1,7,7);
        return morphs;
      },
      statements: [
        ["block","if",[["get","github",["loc",[null,[7,8],[7,14]]]]],[],0,null,["loc",[null,[7,2],[11,9]]]],
        ["content","subheading",["loc",[null,[16,39],[16,53]]]],
        ["content","slim-heading",["loc",[null,[18,45],[18,61]]]],
        ["content","strong-heading",["loc",[null,[18,109],[18,127]]]],
        ["content","byline",["loc",[null,[20,32],[20,42]]]],
        ["content","yield",["loc",[null,[21,4],[21,13]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('dummy/config/environment', ['ember'], function(Ember) {
  var prefix = 'dummy';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("dummy/tests/test-helper");
} else {
  require("dummy/app")["default"].create({"name":"ember-searchable-select","version":"0.9.2+f48779a3"});
}

/* jshint ignore:end */
