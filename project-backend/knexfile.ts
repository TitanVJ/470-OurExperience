// Update with your config settings.
import { db_config } from './src/config/config';

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: db_config.host,
      port: db_config.port,
      user: db_config.user,
      password: db_config.password,
      database: db_config.database
    },
    migrations: {
      directory: './db/migrations'
    }
  }
};
