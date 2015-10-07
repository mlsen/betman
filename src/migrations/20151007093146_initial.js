
exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTable('users', function(table) {
      table.increments();
      table.string('name');
      table.string('password');
      table.string('email');
      table.timestamps();
    }),

    knex.schema.createTable('bets', function(table) {
      table.increments();
      table.string('event');
      table.timestamps();
    })

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('bets')
  ]);
};
