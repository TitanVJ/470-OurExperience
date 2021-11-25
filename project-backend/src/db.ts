import knex from 'knex';
import { Model } from 'objection';

const knexConfig = require('../knexfile');
const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[environment];

const Knex = knex(connectionConfig);
Model.knex(Knex);

export default Model;
