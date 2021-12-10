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

export const session_config = {
  secret            : process.env.SESSION_SECRET || 'super secret dev secret',
  resave            : false,
  saveUninitialized : true,
  cookie: {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
};

export const cas_config = {
  cas_url         : 'https://cas:8443/cas',
  service_url     : `http://localhost:${SERVER_PORT}`,
  cas_version     : '3.0',
  cas_port        : 8443,
  renew           : false,
  is_dev_mode     : process.env.CAS_DEV_MODE,
  dev_mode_user   : process.env.CAS_DEV_MODE,
  dev_mode_info   : {},
  session_name    : 'cas_user',
  session_info    : 'cas_userinfo',
  destroy_session : false,
  return_to       : `http://localhost:${SERVER_PORT}`
};