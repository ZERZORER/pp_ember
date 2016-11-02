export default function() {
this.get('/empleados');
this.get('/empleados/:id');
this.post('/empleados');
this.del('/empleados/:id');
this.patch('/empleados/:id');
this.get('/clientes');
this.get('/clientes/:id');
this.post('/clientes');
this.del('/clientes/:id');
this.patch('/clientes/:id');
this.get('/productos');
this.get('/productos/:id');
this.post('/productos');
this.del('/productos/:id');
this.patch('/productos/:id');

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */
}
