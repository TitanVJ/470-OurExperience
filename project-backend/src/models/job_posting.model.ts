import Model from '../db';

export class JobPosting extends Model {
  static get tableName() {
    return 'JobPosting';
  }

  static get relationMappings() {
    return {
      company: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/company.model`,
        join: {
          from: 'JobPosting.companyId',
          to: 'Company.id'
        }
      }
    };
  }
}
