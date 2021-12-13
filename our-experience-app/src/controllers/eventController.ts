import { Request, Response, NextFunction } from 'express';
import { Event } from '../models/event.model';
import { UserEvent } from '../models/user_event.model';

const getEventList = async (req: Request, res: Response, next: NextFunction) => {
  const events = await Event.query();
  try {
    res.render('event_list', { title: 'Events', events: events });
  } catch (error: any) {
    next();
  }
};

const getEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = +req.params.id;
  if (!eventId) {
    res.sendStatus(400);
    return;
  }
  try {
    const event = await Event.query().findById(eventId);
    const isUserRegistered = (await UserEvent.query().where('eventId', '=', eventId).andWhere('userId', '=', 1)).length;
    if (!event) throw new Error();
    res.render('event', { title: event.title, event: event, isUserRegistered: isUserRegistered });
  } catch (error: any) {
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

const getCalendarByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userEvents: any = await UserEvent.query().withGraphFetched('event').where('userId', '=', 1);
    const events = userEvents.map((userEvent: any) => {
      return {
        id: userEvent.event.id,
        title: userEvent.event.title,
        start: userEvent.event.date,
        url: `/events/${userEvent.event.id}`
      };
    });
    res.render('calendar', { title: 'My Calendar', events: events });
  } catch (error: any) {
    next();
  }
};

export default { getEventList, getEvent, registerForEvent, unregisterFromEvent, getCalendarByUserId };
