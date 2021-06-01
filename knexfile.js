const config = require('./src/config');

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: config.DBHOST,
      port: config.DBPORT,
      database: config.DBNAME,
      user: config.DBUSER,
      password: config.DBPASSWORD || '',
    },
    pool: {
      min: 1,
      max: 2,
    },
    debug: true,
    migrations: {
      tableName: 'db_migrations',
      directory: './src/migrations',
    },
  },
  production: {
    client: 'pg',
    connection: {
      connectionString: config.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    pool: {
      min: 1,
      max: 2,
    },
    debug: false,
    migrations: {
      tableName: 'db_migrations',
      directory: './src/migrations',
    },
  },
};
