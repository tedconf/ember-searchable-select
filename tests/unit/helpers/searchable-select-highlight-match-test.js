import { searchableSelectHighlightMatch } from '../../../helpers/searchable-select-highlight-match';
import { module, test } from 'qunit';

module('Unit | Helper | searchable select highlight match');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = searchableSelectHighlightMatch(['hello there','th']);
  assert.equal(
    result,
    'hello <span class="Searchable-select__matched-text">th</span>ere');
});
