import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('searchable-select-option', 'Integration | Component | searchable select option', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('option', {
    title: '  fake title'
  });

  this.render(hbs`{{searchable-select-option
   option=option}}`);

  assert.equal(this.$().text().trim(), 'fake title');
});
