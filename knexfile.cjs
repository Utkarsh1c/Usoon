// Update with your config settings.

module.exports = {

  // dev config
  development: {
    client: 'postgresql',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '12345',
      database : 'testdb'
    },
    migrations: {
      path: './migrations'
    }
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production config
  production: {
    client: 'postgresql',
    connection: {
      host : 'database-1.crqytfvwyurl.eu-west-3.rds.amazonaws.com',
      user : 'postgres',
      password : 'DaAKMkRA0U797bmLOENk',
      database : 'postgres'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
