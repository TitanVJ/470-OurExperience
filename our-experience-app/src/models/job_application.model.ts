import Model from '../db';

export class JobApplication extends Model {
  static get tableName() {
    return 'JobApplication';
  }

  static get relationMappings() {
    return {
      posting: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/job_posting.model`,
        join: {
          from: 'JobApplication.postingId',
          to: 'JobPosting.id'
        }
      }
    };
  }
}
