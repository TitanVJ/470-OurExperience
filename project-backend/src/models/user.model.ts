import Model from '../db';
import tableNames from '../constants/tableNames';

// User model.
export class User extends Model {
  static get tableName() {
    return tableNames.user;
  }
}
