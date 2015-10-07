
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({
      id: 1,
      name: 'mlsn',
      password: 'blabla',
      email: 'mlsn@mlsn.me',
      created_at: knex.raw('now()'),
      updated_at: null
    }),
    knex('users').insert({
      id: 2,
      name: 'dimage',
      password: 'blabla',
      email: 'dimage@mlsn.me',
      created_at: knex.raw('now()'),
      updated_at: null
    }),
    knex('users').insert({
      id: 3,
      name: 'danny',
      password: 'blabla',
      email: 'danny@mlsn.me',
      created_at: knex.raw('now()'),
      updated_at: null
    })
  );
};
