import Ember from 'ember';
import SaveModelMixin from 'pp-ember/mixins/empleados/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, {
  model: function() {
    return this.store.createRecord('empleado');
  }
});
