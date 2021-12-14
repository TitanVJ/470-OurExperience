import Model from '../db';

export class Event extends Model {
  id!: number;
  title!: string;

  static get tableName() {
    return 'Event';
  }

  static get relationMappings() {
    return {
      attendees: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/user.model`,
        join: {
          from: 'Event.id',
          through: {
            from: 'UserEvent.eventId',
            to: 'UserEvent.userId'
          },
          to: 'User.id'
        }
      }
    };
  }
}
