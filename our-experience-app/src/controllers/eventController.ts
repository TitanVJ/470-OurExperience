import { Request, Response, NextFunction } from 'express';
import { Event } from '../models/event.model';

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

const getCalendarByUserId = (req: Request, res: Response, next: NextFunction) => {
  const events = [
    { title: 'Test Event 1', start: new Date() },
    { title: 'Test Event 2', start: new Date('Dec 14, 2021') }
  ];
  res.render('calendar', { title: 'My Calendar', events: events });
};

export default { getEventList, getEvent, getCalendarByUserId };
