
exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTable('users', function(table) {
      table.increments();
      table.string('name').unique();
      table.string('password');
      table.string('email').unique();
      table.integer('credits');
      table.boolean('active').defaultTo(false);
      table.string('activation_key');
      table.timestamps();
    }),

    knex.schema.createTable('events', function(table) {
      table.increments();
      table.string('description');
      table.dateTime('start');
      table.dateTime('end');
      table.integer('closing_delta');
      table.timestamps();
    }),

    knex.schema.createTable('bets', function(table) {
      table.increments();
      table.integer('event_id').index();
      table.string('description');
    }),

    knex.schema.createTable('submitted_bets', function(table) {
      table.increments();
      table.integer('bet_id').index();
      table.integer('user_id').index();
      table.integer('amount');
      table.dateTime('submitted_at');
    })

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('event'),
    knex.schema.dropTable('bets'),
    knex.schema.dropTable('submitted_bets')
  ]);
};
