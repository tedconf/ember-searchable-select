import Ember from 'ember';

export function searchableSelectHighlightMatch([text, matchText]) {
  if (!matchText) {
    return text;
  }

  let highlightedText = text.replace(
    new RegExp(`(${matchText})`, 'i'),
    '<span class="Searchable-select__matched-text">$1</span>');

  return Ember.String.htmlSafe(highlightedText);
}

export default Ember.Helper.helper(searchableSelectHighlightMatch);
