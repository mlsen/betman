const controllers = require('./controllers');

const register = function(app) {

  // Auth routes
  app.post('/auth/activate/:id', controllers.auth.activate);
  app.get('/auth/activate/:id/:key', controllers.auth.activate);

  // User routes
  app.post('/users', controllers.users.create);
  app.get('/users', controllers.users.list);
  app.get('/users/:id', controllers.users.detail);
  app.delete('/users/:id', controllers.users.destroy);

  return app;
};

module.exports.register = register;
