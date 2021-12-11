import Model from '../db';

export interface JobPosting {
  Id: number,
  companyId: string,
  deadline: string,
  description: string,
  title: string
}

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
      },
      applicants: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/user.model`,
        join: {
          from: 'JobPosting.id',
          through: {
            from: 'JobApplication.postingId',
            to: 'JobApplication.userId'
          },
          to: 'User.id'
        }
      }
    };
  }
}
