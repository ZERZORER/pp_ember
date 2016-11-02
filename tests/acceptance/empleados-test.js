import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Empleado', {
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

test('visiting /empleados without data', function(assert) {
  visit('/empleados');

  andThen(function() {
    assert.equal(currentPath(), 'empleados.index');
    assert.equal(find('#blankslate').text().trim(), 'No Empleados found');
  });
});

test('visiting /empleados with data', function(assert) {
  server.create('empleado');
  visit('/empleados');

  andThen(function() {
    assert.equal(currentPath(), 'empleados.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new empleado', function(assert) {
  visit('/empleados');
  click('a:contains(New Empleado)');

  andThen(function() {
    assert.equal(currentPath(), 'empleados.new');

    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Paterno) input', 'MyString');
    fillIn('label:contains(Materno) input', 'MyString');
    fillIn('label:contains(Correo) input', 'MyString');
    fillIn('label:contains(Direccion) input', 'MyString');
    fillIn('label:contains(Telefono) input', 'MyString');
    fillIn('label:contains(Area) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing empleado', function(assert) {
  server.create('empleado');
  visit('/empleados');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'empleados.edit');

    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Paterno) input', 'MyString');
    fillIn('label:contains(Materno) input', 'MyString');
    fillIn('label:contains(Correo) input', 'MyString');
    fillIn('label:contains(Direccion) input', 'MyString');
    fillIn('label:contains(Telefono) input', 'MyString');
    fillIn('label:contains(Area) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing empleado', function(assert) {
  server.create('empleado');
  visit('/empleados');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'empleados.show');

    assert.equal(find('p strong:contains(Nombre:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Paterno:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Materno:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Correo:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Direccion:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Telefono:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Area:)').next().text(), 'MyString');
  });
});

test('delete a empleado', function(assert) {
  server.create('empleado');
  visit('/empleados');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'empleados.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
