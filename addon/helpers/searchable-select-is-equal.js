import Ember from 'ember';

export function searchableSelectIsEqual([leftside, rightside]) {
  return leftside === rightside;
}

export default Ember.Helper.helper(searchableSelectIsEqual);
