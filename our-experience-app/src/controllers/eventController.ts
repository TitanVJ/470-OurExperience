import { Request, Response, NextFunction } from 'express';
import { Event } from '../models/event.model';

const getEventList = async (req: Request, res: Response, next: NextFunction) => {
  const events = await Event.query();
  res.render('event_list', { title: 'Events', events: events });
};

const getEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = +req.params.id;
  const event = await Event.query().findById(eventId);
  res.render('event', { event: event });
};

const getCalendarByUserId = (req: Request, res: Response, next: NextFunction) => {};

export default { getEventList, getEvent, getCalendarByUserId };
