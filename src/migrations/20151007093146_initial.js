
exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTable('users', function(table) {
      table.increments();
      table.string('name').unique();
      table.string('password');
      table.string('email').unique();
      table.boolean('active').defaultTo(false);
      table.string('activation_key');
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
