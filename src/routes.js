const controllers = require('./controllers');

const register = function(app) {

  // User routes
  app.post('/users', controllers.users.create);
  app.get('/users', controllers.users.list);
  app.get('/users/:id', controllers.users.detail);
  app.delete('/users/:id', controllers.users.destroy);

  return app;
};

module.exports.register = register;
