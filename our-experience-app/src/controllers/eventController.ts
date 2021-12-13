import { Request, Response, NextFunction } from 'express';
import { Event } from '../models/event.model';
import { UserEvent } from '../models/user_event.model';

const getEventList = async (req: Request, res: Response, next: NextFunction) => {
  const events = await Event.query();
  res.render('event_list', { title: 'Events', events: events });
};

const getEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = +req.params.id;
  const event = await Event.query().findById(eventId);
  if (event) {
    res.render('event', { event: event });
  } else {
    next();
  }
};

const registerForEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = +req.params.id;
  await UserEvent.query().insert({ eventId: eventId, userId: 1 });
  res.sendStatus(201);
};

const getCalendarByUserId = (req: Request, res: Response, next: NextFunction) => {
  const events = [
    { title: 'Test Event 1', start: new Date(), url: '/events/1' },
    { title: 'Test Event 2', start: new Date('Dec 14, 2021'), url: '/events/1' }
  ];
  res.render('calendar', { title: 'My Calendar', events: events });
};

export default { getEventList, getEvent, registerForEvent, getCalendarByUserId };
