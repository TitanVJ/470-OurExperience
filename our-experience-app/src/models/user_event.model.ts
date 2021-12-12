import Model from '../db';

export class UserEvent extends Model {
  static get tableName() {
    return 'UserEvent';
  }
}
