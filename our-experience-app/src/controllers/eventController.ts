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
  const isUserRegistered = (await UserEvent.query().where('eventId', '=', eventId).andWhere('userId', '=', 1)).length;
  if (event) {
    res.render('event', { title: event.title, event: event, isUserRegistered: isUserRegistered });
  } else {
    next();
  }
};

const registerForEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = +req.params.id;
  if (!eventId) {
    res.sendStatus(400);
    return;
  }
  try {
    await UserEvent.query().insert({ eventId: eventId, userId: 1 });
    res.sendStatus(201);
  } catch (error: any) {
    next();
  }
};

const unregisterFromEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = +req.params.id;
  if (!eventId) {
    res.sendStatus(400);
    return;
  }
  try {
    await UserEvent.query().delete().where('eventId', '=', eventId).andWhere('userId', '=', 1);
    res.sendStatus(204);
  } catch (error: any) {
    next();
  }
};

const getCalendarByUserId = (req: Request, res: Response, next: NextFunction) => {
  const events = [
    { title: 'Test Event 1', start: new Date('Dec 13, 2021'), url: '/events/1' },
    { title: 'Test Event 2', start: new Date('Dec 14, 2021'), url: '/events/1' }
  ];
  res.render('calendar', { title: 'My Calendar', events: events });
};

export default { getEventList, getEvent, registerForEvent, unregisterFromEvent, getCalendarByUserId };
