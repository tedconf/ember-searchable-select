import { searchableSelectIsEqual } from '../../../helpers/searchable-select-is-equal';
import { module, test } from 'qunit';

module('Unit | Helper | searchable select is equal');

test('it returns true when the two sides are equal', function(assert) {
  var result = searchableSelectIsEqual(['123', '123']);
  assert.ok(result);
});

test('it returns false when the two sides are not equal', function(assert) {
  var result = searchableSelectIsEqual(['123', '1234']);
  assert.ok(!result);
});
