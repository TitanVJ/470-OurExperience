import Model from '../db';

export class Document extends Model {
  static get tableName() {
    return 'Document';
  }
}
