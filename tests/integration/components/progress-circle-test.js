import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('progress-circle', 'Integration | Component | progress circle', {
  integration: true
});

test('it renders the block', function(assert) {
  assert.expect(2);
  this.render(hbs`{{progress-circle}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#progress-circle size="90" strokeWidth="10"}}
      block text
    {{/progress-circle}}
  `);

  assert.equal(this.$().text().trim(), 'block text');
});

test('it renders elements', function(assert) {
  assert.expect(2);
  this.render(hbs`{{progress-circle}}`);

  assert.equal(this.$('svg').length, 1, 'the svg element isnt rendered');
  assert.equal(this.$('circle').length, 2, 'the circle elements are not rendered');

});

test('the svg size is properly added and attribute binding works', function(assert) {
  assert.expect(4);
  this.render(hbs`{{progress-circle}}`);
  const svg = this.$('svg');

  assert.equal(svg.attr('width'), '90', 'the size isnt properly rendered');
  assert.equal(svg.attr('height'), '90', 'the size isnt properly rendered');
  assert.equal(svg.attr('viewBox'), '0 0 90 90', 'the svg element isnt rendered');
  assert.equal(svg.attr('xmlns'), 'http://www.w3.org/2000/svg', 'the xmlns property binding isnt correct');
});

test('the circles position and stroke attributes are calculated properly', function(assert) {
  assert.expect(8);
  this.render(hbs`{{progress-circle}}`);

  const bgCircle        = this.$('circle:nth-of-type(1)');
  const indicatorCircle = this.$('circle:nth-of-type(2)');

  assert.equal(bgCircle.attr('cx'), '45', 'the circle is position wrong');
  assert.equal(bgCircle.attr('cy'), '45', 'the circle is position wrong');
  assert.equal(bgCircle.attr('stroke-width'), '10', 'the stroke attr isnt correctly added');

  assert.equal(indicatorCircle.attr('cx'), '45', 'the circle is position wrong');
  assert.equal(indicatorCircle.attr('cy'), '45', 'the circle is position wrong');
  assert.equal(indicatorCircle.attr('stroke-width'), '10', 'the stroke attr isnt correctly added');

  assert.equal(indicatorCircle.attr('stroke-dasharray'), '219', 'the indicator should completely fill the ring');
  assert.equal(indicatorCircle.attr('stroke-dashoffset'), '219', 'the indicator should completely be empty');
});

test('the circles position and stroke attributes are calculated properly', function(assert) {
  assert.expect(2);
  const percentage = null;
  this.set('percentage', percentage);

  this.render(hbs`
    {{#progress-circle size="90" strokeWidth="10" percentage=percentage}}
      block text
    {{/progress-circle}}
  `);
  const indicatorCircle = this.$('circle:nth-of-type(2)');

  assert.equal(indicatorCircle.attr('stroke-dashoffset'), '219', 'the indicator should be completely empty');

  this.set('percentage', '50');
  assert.equal(indicatorCircle.attr('stroke-dashoffset'), '109', 'the indicator should be half full');
});

test('the indicators class name should expose the empty state', function(assert) {
  assert.expect(1);

  this.render(hbs`{{progress-circle percentage='0'}}`);
  const indicatorCircle = this.$('circle:nth-of-type(2)');
  assert.equal(indicatorCircle.attr('class'), 'progress-circle__indicator--empty', 'the indicators class should be progress-circle__indicator--empty');
});

test('the indicators class name should expose the filled state', function(assert) {
  assert.expect(1);

  this.render(hbs`{{progress-circle percentage='10'}}`);
  const indicatorCircle = this.$('circle:nth-of-type(2)');
  assert.equal(indicatorCircle.attr('class'), 'progress-circle__indicator--filled', 'the indicators class should be progress-circle__indicator--filled');
});

test('the indicators class name should expose the invalid state', function(assert) {
  assert.expect(1);

  this.render(hbs`{{progress-circle percentage='Bananarama'}}`);
  const indicatorCircle = this.$('circle:nth-of-type(2)');
  assert.equal(indicatorCircle.attr('class'), 'progress-circle__indicator--invalid', 'the indicators class should be progress-circle__indicator--invalid');
});
