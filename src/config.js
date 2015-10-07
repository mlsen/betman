module.exports = {

  database: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_PORT_5432_TCP_ADDR,
      user: 'postgres',
      password: 'postgres',
      database: 'postgres',
      charset: 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  mailgun: {
    key: process.env.MAILGUN_KEY
  }

};
