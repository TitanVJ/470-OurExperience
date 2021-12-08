import Model from '../db';

export class JobApplication extends Model {
  static get tableName() {
    return 'JobApplication';
  }
}
