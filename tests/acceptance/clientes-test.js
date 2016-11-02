import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Cliente', {
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

test('visiting /clientes without data', function(assert) {
  visit('/clientes');

  andThen(function() {
    assert.equal(currentPath(), 'clientes.index');
    assert.equal(find('#blankslate').text().trim(), 'No Clientes found');
  });
});

test('visiting /clientes with data', function(assert) {
  server.create('cliente');
  visit('/clientes');

  andThen(function() {
    assert.equal(currentPath(), 'clientes.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new cliente', function(assert) {
  visit('/clientes');
  click('a:contains(New Cliente)');

  andThen(function() {
    assert.equal(currentPath(), 'clientes.new');

    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Paterno) input', 'MyString');
    fillIn('label:contains(Materno) input', 'MyString');
    fillIn('label:contains(Correo) input', 'MyString');
    fillIn('label:contains(Direccion) input', 'MyString');
    fillIn('label:contains(Telefono) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing cliente', function(assert) {
  server.create('cliente');
  visit('/clientes');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'clientes.edit');

    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Paterno) input', 'MyString');
    fillIn('label:contains(Materno) input', 'MyString');
    fillIn('label:contains(Correo) input', 'MyString');
    fillIn('label:contains(Direccion) input', 'MyString');
    fillIn('label:contains(Telefono) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing cliente', function(assert) {
  server.create('cliente');
  visit('/clientes');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'clientes.show');

    assert.equal(find('p strong:contains(Nombre:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Paterno:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Materno:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Correo:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Direccion:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Telefono:)').next().text(), 'MyString');
  });
});

test('delete a cliente', function(assert) {
  server.create('cliente');
  visit('/clientes');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'clientes.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
