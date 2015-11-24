import { searchableSelectContains } from '../../../helpers/searchable-select-contains';
import { module, test } from 'qunit';

module('Unit | Helper | searchable select contains');

// Replace this with your real tests.
test('it works', function(assert) {
  const array = ['abc', '123'];
  const item = '123';

  let result = searchableSelectContains([array, item]);

  assert.ok(result);
});
