import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent(
  'searchable-select',
  'Integration | Component | searchable select multiple',
  { integration: true }
);

const TEDevents = Ember.A([
  {
    id: 1,
    title: 'TED2015',
    longTitle: 'TED2015: Truth and Dare',
    keywords: '',
    isTEDxEvent: false
  },
  {
    id: 2,
    title: 'TEDxNASA',
    keywords: '',
    isTEDxEvent: true
  },
  {
    id: 3,
    title: 'TED2014',
    keywords: '',
    isTEDxEvent: false
  },
  {
    id: 4,
    title: 'TEDGlobal 2014',
    keywords: '',
    isTEDxEvent: false
  },
  {
    id: 5,
    title: 'TEDxNewYork',
    keywords: 'NYC',
    isTEDxEvent: true
  },
  {
    id: 6,
    title: 'TEDGlobal 2013',
    keywords: '',
    isTEDxEvent: false
  },
  {
    id: 7,
    title: 'TED2013',
    keywords: '',
    isTEDxEvent: false
  }
]);

const dummyEventSelection = TEDevents.filter(event => {
  return event.title === 'TED2014' || event.title === 'TED2013';
});

test('can use multi-select when multiple is true', function(assert) {
  assert.expect(1);
  this.set('content', TEDevents);

  this.set('initialSelection',  [TEDevents.findBy('title', 'TED2014')]);

  let expectedSelection = dummyEventSelection;

  this.actions = {
    assertChanged(selection) {
      assert.deepEqual(selection, expectedSelection,
        'multi select is passed out as an array'
      );
    }
  };

  this.render(hbs`{{searchable-select
    content=content
    multiple=true
    selected=initialSelection
    on-change=(action "assertChanged")}}`);

  this.$('.Searchable-select__label').click();
  this.$('.Searchable-select__option:contains("TED2013")').click();
});

test('mutli-selected options display as pills', function(assert) {
  assert.expect(3);
  this.set('content', TEDevents);
  this.set('initialSelection',  dummyEventSelection);

  this.render(hbs`{{searchable-select
    content=content
    multiple=true
    selected=initialSelection}}`);

  let $selectedPills = this.$('.Searchable-select__selected-pill');

  assert.equal($selectedPills.length, 2);
  assert.equal($selectedPills.filter(':contains("TED2013")').length, 1,
    'pills are labeled with item keys');
  assert.equal($selectedPills.filter(':contains("TED2014")').length, 1,
    'pills are labeled with item keys');

});

test('can remove selection with pill clear button', function(assert) {
  assert.expect(3);
  this.set('content', TEDevents);
  this.set('initialSelection',  dummyEventSelection);

  this.actions = {
    assertChanged(selection) {
      assert.equal(selection.length, 1);
    }
  };

  this.render(hbs`{{searchable-select
    content=content
    multiple=true
    selected=initialSelection
    on-change=(action "assertChanged")}}`);

  this.$('.Searchable-select__selected-pill:contains("TED2014")')
    .find('.Searchable-select__selected-pill-clear')
    .click();

  assert.equal(this.$('.Searchable-select__selected-pill').length, 1);
  assert.equal(
    this.$('.Searchable-select__selected-pill:contains("TED2014")').length,
    0
  );
});

test('can clear multi selection with a clear button', function(assert) {
  assert.expect(1);
  this.set('content', TEDevents);

  let multiSelected = TEDevents.filter(event => {
    return event.title === 'TED2013' || event.title === 'TED2014';
  });

  this.set('selected', multiSelected);

  this.actions = {
    assertChanged(selection) {
      assert.deepEqual(selection, []);
    }
  };

  this.render(hbs`{{searchable-select
    content=content
    selected=selected
    multiple=true
    on-change=(action "assertChanged")}}`);

  this.$('.Searchable-select__label').click();
  this.$('.Searchable-select__clear').click();
});

test('can toggle selected state of a multi-select option', function(assert) {
  assert.expect(4);

  this.set('content', TEDevents);

  this.render(hbs`{{searchable-select
    content=content
    multiple=true }}`);

  this.$('.Searchable-select__label').click();
  this.$('.Searchable-select__option:contains("TED2015")').click();

  assert.equal(this.$('.Searchable-select__selected-pill').length, 1,
    'pill is displayed when selection is made');

  this.$('.Searchable-select__label').click();

  let $selected = this.$('.Searchable-select__option-label--selected');
  assert.equal($selected.text().trim(), 'TED2015',
    'item is highlighted when selection is made');

  $selected.click();

  this.$('.Searchable-select__label').click();

  assert.equal(this.$('.Searchable-select__selected-pill').length, 0,
    'item is removed from selection');
  assert.equal(this.$('.Searchable-select__option-label--selected').length, 0,
    'item is no longer highlighted');

});

test('multi-select is not two-way bound', function(assert) {
  assert.expect(1);
  this.set('content', TEDevents);

  let initialSelection = [TEDevents.findBy('title', 'TED2014')];

  this.set('initialSelection',  initialSelection);

  this.actions = {
    assertChanged(selection) {
      assert.equal(initialSelection[0].title, 'TED2014');
    }
  };

  this.render(hbs`{{searchable-select
    content=content
    multiple=true
    selected=initialSelection
    on-change=(action "assertChanged")}}`);

  this.$('.Searchable-select__label').click();
  this.$('.Searchable-select__option:contains("TED2013")').click();
});
