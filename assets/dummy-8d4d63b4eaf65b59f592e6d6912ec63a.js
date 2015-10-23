"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('dummy/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'dummy/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

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
define('dummy/components/searchable-select', ['exports', 'ember-searchable-select/components/searchable-select'], function (exports, searchable_select) {

	'use strict';



	exports['default'] = searchable_select['default'];

});
define('dummy/components/ted-page-header', ['exports', 'ember-ted-docs/components/ted-page-header'], function (exports, ted_page_header) {

	'use strict';



	exports['default'] = ted_page_header['default'];

});
define('dummy/controllers/application', ['exports', 'ember-searchable-select/controllers/application'], function (exports, application) {

	'use strict';



	exports['default'] = application['default'];

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
define('dummy/helpers/searchable-select-is-equal', ['exports', 'ember-searchable-select/helpers/searchable-select-is-equal'], function (exports, searchable_select_is_equal) {

	'use strict';



	exports['default'] = searchable_select_is_equal['default'];
	exports.searchableSelectIsEqual = searchable_select_is_equal.searchableSelectIsEqual;

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
    }])
  });

});
define('dummy/pods/application/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 2
            },
            "end": {
              "line": 33,
              "column": 2
            }
          },
          "moduleName": "dummy/pods/application/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ## Installation\n\n    To get started, install this addon,  [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass), and include the ember-searchable-select styles in your app.scss.\n\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("    ```\n    npm install --save-dev git+ssh://git@github.com/tedconf/ember-searchable-select.git\n    ember install ember-cli-sass\n\n    ```\n    ");
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
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 44,
            "column": 0
          }
        },
        "moduleName": "dummy/pods/application/template.hbs"
      },
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
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(element0,3,3);
        morphs[2] = dom.createMorphAt(element0,5,5);
        morphs[3] = dom.createMorphAt(element0,7,7);
        morphs[4] = dom.createMorphAt(element0,9,9);
        morphs[5] = dom.createMorphAt(element0,11,11);
        morphs[6] = dom.createMorphAt(element0,13,13);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["inline","ted-page-header",[],["subheading","Ember","slim-heading","Searchable ","strong-heading","Select","byline","A select-like menu with searching and filtering capabilities"],["loc",[null,[1,0],[5,73]]]],
        ["block","ember-markdown-section",[],[],0,null,["loc",[null,[9,2],[33,29]]]],
        ["inline","examples/example-default",[],["TEDevents",["subexpr","@mut",[["get","TEDevents",["loc",[null,[35,39],[35,48]]]]],[],[]]],["loc",[null,[35,2],[35,50]]]],
        ["inline","examples/initial-selection",[],["TEDevents",["subexpr","@mut",[["get","TEDevents",["loc",[null,[36,41],[36,50]]]]],[],[]]],["loc",[null,[36,2],[36,52]]]],
        ["inline","examples/word-boundary",[],["TEDevents",["subexpr","@mut",[["get","TEDevents",["loc",[null,[37,37],[37,46]]]]],[],[]]],["loc",[null,[37,2],[37,48]]]],
        ["inline","examples/ajax-search",[],["TEDevents",["subexpr","@mut",[["get","TEDevents",["loc",[null,[38,35],[38,44]]]]],[],[]]],["loc",[null,[38,2],[38,46]]]],
        ["content","options-table",["loc",[null,[40,2],[40,19]]]]
      ],
      locals: [],
      templates: [child0]
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
        "revision": "Ember@1.13.7",
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
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
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
        morphs[1] = dom.createMorphAt(element1,4,4);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [2]),1,1);
        morphs[3] = dom.createMorphAt(element2,4,4);
        morphs[4] = dom.createMorphAt(dom.childAt(element2, [6]),1,1);
        return morphs;
      },
      statements: [
        ["inline","code-snippet",[],["name","default.hbs"],["loc",[null,[8,4],[8,39]]]],
        ["inline","code-snippet",[],["name","ajax-search.js"],["loc",[null,[11,4],[11,42]]]],
        ["content","queryText",["loc",[null,[16,17],[16,30]]]],
        ["inline","searchable-select",[],["content",["subexpr","@mut",[["get","filteredTEDevents",["loc",[null,[19,12],[19,29]]]]],[],[]],"sortBy","title","on-change",["subexpr","action",["updateSelection"],[],["loc",[null,[21,14],[21,40]]]],"on-search",["subexpr","action",["updateSearch"],[],["loc",[null,[22,14],[22,37]]]]],["loc",[null,[18,2],[22,39]]]],
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
        "revision": "Ember@1.13.7",
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
        "revision": "Ember@1.13.7",
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
        ["inline","code-snippet",[],["name","default.hbs"],["loc",[null,[5,4],[5,39]]]],
        ["inline","searchable-select",[],["content",["subexpr","@mut",[["get","TEDevents",["loc",[null,[12,12],[12,21]]]]],[],[]],"sortBy","title","selected",["subexpr","@mut",[["get","initialSelection",["loc",[null,[14,13],[14,29]]]]],[],[]],"on-change",["subexpr","action",["update"],[],["loc",[null,[15,14],[15,31]]]]],["loc",[null,[11,2],[15,33]]]],
        ["content","initialSelection.title",["loc",[null,[17,24],[17,50]]]],
        ["content","setBySearchable.title",["loc",[null,[18,24],[18,49]]]]
      ],
      locals: [],
      templates: []
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
        "revision": "Ember@1.13.7",
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
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 4
            },
            "end": {
              "line": 16,
              "column": 4
            }
          },
          "moduleName": "dummy/pods/components/options-table/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ## Configurable options\n\n    Option | Description | Type | Default value\n    --- | --- | ---\n    content | array of items to populate the list | Ember.A() | null\n    selected | pass in an initial selection | Object | null\n    optionLabelKey | the item property to use as the visible label in the menu | string | 'title'\n    prompt | prompt text for the main input | string | 'Select an option'\n    searchPrompt | prompt text for the search input | string | 'Type to search'\n    limitSearchToWordBoundary | when set to true, search will only match the beginning of words | boolean | true\n    sortBy | provide an options item key to sort the list by | boolean | false\n    on-change | Specify your own named action to trigger when the search text  changes. eg. ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("code");
          var el2 = dom.createTextNode("(action \"update\")");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" The search text is sent as an argument. | Ember action | Ember.K\n    on-search | Specify your own named action to trigger when the search text  changes. eg. ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("code");
          var el2 = dom.createTextNode("(action \"update\")");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("The search text is sent as an argument. Useful for custom filtering or AJAX search. Note that internal filter is automatically disabled when an on-search action is provided. | Ember action | Ember.K\n\n");
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
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 31
          }
        },
        "moduleName": "dummy/pods/components/options-table/template.hbs"
      },
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
        ["block","ember-markdown-section",[],[],0,null,["loc",[null,[1,4],[16,31]]]]
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
    "ajax-search.js": "export default Ember.Component.extend({\n  classNames: 'Example',\n  TEDevents: null,\n  filteredTEDevents: null,\n  setBySearchable: null,\n  queryText: null,\n\n  actions: {\n    updateSelection(selection){\n      this.set('setBySearchable', selection);\n    },\n    updateSearch(text){\n      // this example filters a local data set,\n      // you could also AJAX update your content here\n      this.set('queryText', text);\n\n      let regex = this.get('queryText') ? new RegExp(this.get('queryText'), 'i') : new RegExp('/S', 'i');\n\n      let matches = this.get('TEDevents').filter(item => {\n        return regex.test(item.title) || regex.test(item.keywords);\n      });\n\n      this.set('filteredTEDevents', Ember.A(matches));\n    }\n  }\n});\n",
    "default.hbs": "\n  {{searchable-select\n    content=TEDevents\n    sortBy=\"title\"\n    selected=initialSelection\n    on-change=(action \"update\")}}\n\n  <p>Initial selection: {{initialSelection.title}}</p>\n  <p>Set by Searchable: {{setBySearchable.title}}</p>",
    "example-default.js": "export default Ember.Component.extend({\n  classNames: 'Example',\n  setBySearchable: null,\n  actions: {\n    update(selection){\n      this.set('setBySearchable', selection);\n    }\n  }\n});",
    "word-boundary.hbs": "  {{searchable-select\n    content=TEDevents\n    sortBy=\"title\"\n    on-change=(action \"update\")\n    limitSearchToWordBoundary=true}}\n\n  <p>Set by Searchable: {{setBySearchable.title}}</p>"
  };

});
define('dummy/templates/components/code-snippet', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
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
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 9
          }
        },
        "moduleName": "dummy/templates/components/ted-page-header.hbs"
      },
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
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        dom.setAttribute(el3,"class","tph-Banner__arrow");
        var el4 = dom.createTextNode(">");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
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
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 1]);
        var element1 = dom.childAt(element0, [3]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [2]),0,0);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [5]),0,0);
        return morphs;
      },
      statements: [
        ["content","subheading",["loc",[null,[10,39],[10,53]]]],
        ["content","slim-heading",["loc",[null,[12,45],[12,61]]]],
        ["content","strong-heading",["loc",[null,[12,109],[12,127]]]],
        ["content","byline",["loc",[null,[14,32],[14,42]]]]
      ],
      locals: [],
      templates: []
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
  require("dummy/app")["default"].create({"name":"ember-searchable-select","version":"0.0.0+7de28a18"});
}

/* jshint ignore:end */
