import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('productos', function() {
    this.route('new');

    this.route('edit', {
      path: ':producto_id/edit'
    });

    this.route('show', {
      path: ':producto_id'
    });
  });
  this.route('clientes', function() {
    this.route('new');

    this.route('edit', {
      path: ':cliente_id/edit'
    });

    this.route('show', {
      path: ':cliente_id'
    });
  });
  this.route('empleados', function() {
    this.route('new');

    this.route('edit', {
      path: ':empleado_id/edit'
    });

    this.route('show', {
      path: ':empleado_id'
    });
  });
  this.route('home', {path: '/'});
});

export default Router;
