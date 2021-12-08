import Model from '../db';

export class ApplicationDocument extends Model {
  static get tableName() {
    return 'ApplicationDocument';
  }
}
