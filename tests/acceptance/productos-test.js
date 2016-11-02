import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Producto', {
  beforeEach: function() {
    application = startApp();
    originalConfirm = window.confirm;
    window.confirm = function() {
      confirmCalledWith = [].slice.call(arguments);
      return true;
    };
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
    window.confirm = originalConfirm;
    confirmCalledWith = null;
  }
});

test('visiting /productos without data', function(assert) {
  visit('/productos');

  andThen(function() {
    assert.equal(currentPath(), 'productos.index');
    assert.equal(find('#blankslate').text().trim(), 'No Productos found');
  });
});

test('visiting /productos with data', function(assert) {
  server.create('producto');
  visit('/productos');

  andThen(function() {
    assert.equal(currentPath(), 'productos.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new producto', function(assert) {
  visit('/productos');
  click('a:contains(New Producto)');

  andThen(function() {
    assert.equal(currentPath(), 'productos.new');

    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Descripcion) input', 'MyString');
    fillIn('label:contains(Precio) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing producto', function(assert) {
  server.create('producto');
  visit('/productos');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'productos.edit');

    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Descripcion) input', 'MyString');
    fillIn('label:contains(Precio) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing producto', function(assert) {
  server.create('producto');
  visit('/productos');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'productos.show');

    assert.equal(find('p strong:contains(Nombre:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Descripcion:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Precio:)').next().text(), 'MyString');
  });
});

test('delete a producto', function(assert) {
  server.create('producto');
  visit('/productos');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'productos.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
