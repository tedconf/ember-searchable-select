# Ember-searchable-select

> This addon is prepared for internal use at TED. We're happy to share our code as open-source, but be aware that it may not be maintianed for broader community use.

## Installation

To get started, install this addon,  [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass), and include the ember-searchable-select styles in your app.scss.

```
ember install ember-searchable-select
ember install ember-cli-sass
 ```

#### app.scss

```
@import "ember-searchable-select/style";
```

## Documentation & Demos

There are many ways to customize and configure ember-searchable-select. Full documentation and demos can be found at [http://tedconf.github.io/ember-searchable-select/](http://tedconf.github.io/ember-searchable-select/).

## Collaborating

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/) (Available with homebrew `brew install phantomjs`)

## Running a demo

* `git clone` this repository
* `npm install`
* `bower install`
* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs ember try:testall to test your addon against multiple Ember versions)

or to run a test server while developing:

* `ember test --server`

## Building

* `ember build`

## For contributors:
PRs that do not include the following will not be merged:

* a passing test suite
* test coverage for your new code
* updated README docs (if applicable)
* updated docs and/or examples in the docs site found in `tests/dummy` (if applicable)

## For maintainers:

### Updating the GitHub pages docs site
* `ember github-pages:commit --message "update gh-pages"`
* `git push origin gh-pages`

### Creating a new release and publishing to npm

* Make sure you have write access on npm. Ask an existing collaborator to grant you access if you don't.
* `npm version $TYPE -m "message about this version"` where $TYPE indicates the semver release type, eg. `patch`, `major` or `minor`. see the [npm-version docs](https://docs.npmjs.com/cli/version) and (semver docs)[http://semver.org/] if you're not sure which applies
* `npm publish`
* `git push --tags`
* document the changes by [creating a new release](https://github.com/tedconf/ember-searchable-select/releases)


For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
