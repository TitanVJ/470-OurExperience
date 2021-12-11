import Model from '../db';

export class JobApplication extends Model {
  static get tableName() {
    return 'JobApplication';
  }

  static get relationMappings() {
    return {
      document: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/document.model`,
        join: {
          from: 'JobApplication.id',
          through: {
            from: 'ApplicationDocument.applicationId',
            to: 'ApplicationDocument.documentId'
          },
          to: 'Document.id'
        }
      }
    };
  }
}
