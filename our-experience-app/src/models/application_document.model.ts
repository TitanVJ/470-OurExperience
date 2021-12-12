import Model from '../db';

export class ApplicationDocument extends Model {
  id!: number;
  applicationId!: number;
  documentId!: number;

  static get tableName() {
    return 'ApplicationDocument';
  }
}
