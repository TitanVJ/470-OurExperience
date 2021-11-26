import Model from '../db';

export class Company extends Model {
  static get tableName() {
    return 'Company';
  }

  static get relationalMappings() {
    const JobPosting = require('./job_posting.model');

    return {
      job_postings: {
        relation: Model.HasManyRelation,
        modelClass: JobPosting,
        join: {
          from: 'Company.id',
          to: 'JobPosting.companyId'
        }
      }
    };
  }
}
