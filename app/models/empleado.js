import DS from 'ember-data';

export default DS.Model.extend({
  nombre: DS.attr('string'),
  paterno: DS.attr('string'),
  materno: DS.attr('string'),
  correo: DS.attr('string'),
  direccion: DS.attr('string'),
  telefono: DS.attr('string'),
  area: DS.attr('string')
});
