import Model from '../db';
import tableNames from '../constants/tableNames';

// User model.
export class User extends Model {
  id!: number;
  username!: string;
  password!: string;
  role!: string;

  static get tableName() {
    return tableNames.user;
  }

  static get relationMappings() {
    return {
      jobs_applied: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/job_posting.model`,
        join: {
          from: 'User.id',
          through: {
            from: 'JobApplication.userId',
            to: 'JobApplication.postingId'
          },
          to: 'JobPosting.id'
        }
      },
      document: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/document.model`,
        join: {
          from: 'User.id',
          to: 'Document.userId'
        }
      },
      events: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/event.model`,
        join: {
          from: 'User.id',
          through: {
            from: 'UserEvent.userId',
            to: 'UserEvent.eventId'
          },
          to: 'Event.id'
        }
      }
    };
  }
}
