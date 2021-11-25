import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '..', '..', '.env') });

const MYSQL_HOST = process.env.MYSQL_HOST || 'mysql';
const MYSQL_PORT = +(process.env.MYSQL_PORT || 3306);
const MYSQL_USER = process.env.MYSQL_USER || 'mysql';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'password';
const MYSQL_DB = process.env.MYSQL_DATABASE || 'db470';

export const db_config = {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB
};

const SERVER_PORT = +(process.env.SERVER_PORT || 5000);

export const server_config = {
  port: SERVER_PORT
};
