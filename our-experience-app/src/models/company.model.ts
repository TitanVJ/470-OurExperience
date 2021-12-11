import Model from '../db';

export interface Company {
  Id: number,
  name: string
}

export class Company extends Model {
  static get tableName() {
    return 'Company';
  }

  static get relationMappings() {
    return {
      job_postings: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/job_posting.model`,
        join: {
          from: 'Company.id',
          to: 'JobPosting.companyId'
        }
      }
    };
  }
}
