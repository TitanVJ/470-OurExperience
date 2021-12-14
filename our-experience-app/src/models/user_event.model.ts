import Model from '../db';

export class UserEvent extends Model {
  id!: number;
  userId!: number;
  eventId!: number;

  static get tableName() {
    return 'UserEvent';
  }

  static get relationMappings() {
    return {
      event: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/event.model`,
        join: {
          from: 'UserEvent.eventId',
          to: 'Event.id'
        }
      }
    };
  }
}
