import Model from '../db';

export class UserEvent extends Model {
  id!: number;
  userId!: number;
  eventId!: number;

  static get tableName() {
    return 'UserEvent';
  }
}
