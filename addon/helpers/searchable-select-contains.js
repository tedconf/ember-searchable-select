import Ember from 'ember';

export function searchableSelectContains([array, item]) {
  return Ember.A(array).contains(item);
}

export default Ember.Helper.helper(searchableSelectContains);
