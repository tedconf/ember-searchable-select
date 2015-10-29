import { searchableSelectGet } from '../../../helpers/searchable-select-get';
import { module, test } from 'qunit';

module('Unit | Helper | searchable select get');

// Replace this with your real tests.
test('it works', function(assert) {
  var result = searchableSelectGet([{title: 'test'}, 'title']);
  assert.equal(result, 'test');
});
