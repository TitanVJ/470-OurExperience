import Model from '../db';

export class JobPosting extends Model {
  static get tableName() {
    return 'JobPosting';
  }

  static get relationalMappings() {
    const Company = require('./company.model');

    return {
      company: {
        relation: Model.BelongsToOneRelation,
        modelClass: Company,
        join: {
          from: 'JobPosting.companyId',
          to: 'company.id'
        }
      }
    };
  }
}
