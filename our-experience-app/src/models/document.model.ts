import Model from '../db';

export class Document extends Model {
  id!: number;
  userId!: number;
  filepath!: string;
  mimeType!: string;
  documentType!: string;
  createdAt?: string;

  static get tableName() {
    return 'Document';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/user.model`,
        join: {
          from: 'Document.userId',
          to: 'User.id'
        }
      }
    };
  }
}
