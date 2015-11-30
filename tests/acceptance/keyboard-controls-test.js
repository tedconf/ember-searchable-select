import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

module('Acceptance | keyboard controls', {
  beforeEach() {
    this.application = startApp();
  },

  afterEach() {
    Ember.run(this.application, 'destroy');
  }
});

const downArrowKeyCode = 40;
const upArrowKeyCode = 38;
const enterKeyCode = 13;
const escKeyCode = 27;
const tabKeyCode = 9;

test('down arrow opens menu when it is focussed but unopened', function(assert) {
  visit('/');

  triggerEvent('.Example--default .Searchable-select__label', 'focus');

  keyEvent('.Example--default .Searchable-select__label',
    'keydown', downArrowKeyCode);

  andThen(function() {
    assert.equal(find('.Example--default .Searchable-select__menu').length, 1);
  });
});

test('esc key closes the menu', function(assert) {
  visit('/');

  click('.Example--default .Searchable-select__label');

  keyEvent('.Example--default .Searchable-select__input',
    'keydown', escKeyCode);

  andThen(function() {
    assert.equal(find('.Example--default .Searchable-select__menu').length, 0);
  });
});

test('tab key closes the menu', function(assert) {
  visit('/');

  click('.Example--default .Searchable-select__label');

  keyEvent('.Example--default .Searchable-select__input',
    'keydown', tabKeyCode);

  andThen(function() {
    assert.equal(find('.Example--default .Searchable-select__menu').length, 0);
  });
});

test('can arrow up and down between options', function(assert) {
  visit('/');

  click('.Example--default .Searchable-select__label');

  triggerEvent(
    '.Example--default .Searchable-select__option:first-child',
    'focus'
  );

  keyEvent('.Example--default .Searchable-select__option:first-child',
    'keydown', downArrowKeyCode);

  andThen(function() {
    assert.equal(
      document.activeElement.innerText,
      'TED2014',
      'can arrow down to next option'
    );
  });

  keyEvent('.Example--default .Searchable-select__option:nth-child(2)',
    'keydown', upArrowKeyCode);

  andThen(function() {
    assert.equal(
      document.activeElement.innerText,
      'TED2013',
      'can arrow up to previous option'
    );
  });
});

test('can select an item with the keyboard', function(assert) {
  visit('/');

  click('.Example--default .Searchable-select__label');
  keyEvent('.Example--default .Searchable-select__input',
    'keydown', downArrowKeyCode);

  andThen(function() {
    assert.ok(
      document.activeElement.classList.contains('Searchable-select__option'),
      'down arrow moves foucs to next item'
    );
  });

  keyEvent('.Example--default .Searchable-select__option:first-child',
    'keydown', enterKeyCode);

  andThen(function() {
    assert.equal(
      find('.Example--default .Searchable-select__label').text().trim(),
      'TED2013',
      'new item has been selected'
    );
  });
});

test('can clear the selection with the keyboard', function(assert) {
  visit('/');

  click('.Example--initial-selection .Searchable-select__label');

  keyEvent('.Example--initial-selection .Searchable-select__input',
    'keydown', downArrowKeyCode);

  andThen(function() {
    assert.ok(
      document.activeElement.classList.contains('Searchable-select__clear'),
      'down arrow moves foucs to clear button'
    );
  });

  keyEvent('.Example--initial-selection .Searchable-select__clear',
    'keydown', enterKeyCode);

  andThen(function() {
    assert.equal(
      find('.Example--initial-selection .Searchable-select__label')
        .text()
        .trim(),
      'Select an option',
      'selection has been cleared'
    );
  });
});

test('can add a new item with the keyboard', function(assert) {
  visit('/');

  click('.Example--add-new .Searchable-select__label');

  fillIn('.Example--add-new .Searchable-select__input', 'bananas');
  triggerEvent('.Example--add-new .Searchable-select__input', 'keyup');

  keyEvent('.Example--add-new .Searchable-select__input',
    'keydown', downArrowKeyCode);

  andThen(function() {
    assert.ok(
      document.activeElement.classList.contains('Searchable-select__add-new'),
      'down arrow moves foucs to add-new button'
    );
  });

  keyEvent('.Example--add-new .Searchable-select__add-new',
    'keydown', enterKeyCode);

  andThen(function() {
    assert.equal(
      find('.Example--add-new .Searchable-select__label:contains("bananas")')
        .length,
      1,
      'new item was added'
    );
  });
});
