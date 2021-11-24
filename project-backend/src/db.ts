import knex from 'knex';
const knexConfig = require('../knexfile');
const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[environment];

const Knex = knex(connectionConfig);

export default Knex;
