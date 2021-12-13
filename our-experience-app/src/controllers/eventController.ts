import { Request, Response, NextFunction } from 'express';
import { Event } from '../models/event.model';
import { UserEvent } from '../models/user_event.model';
const { DateTime } = require('luxon');

const getEventList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await Event.query().select('Event.*', Event.relatedQuery('attendees').count().as('attendeeCount'));
    res.render('event_list', { title: 'Events', events: events, DateTime: DateTime });
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
    const event = await Event.query().findById(eventId).select('Event.*', Event.relatedQuery('attendees').count().as('attendeeCount'));
    const isUserRegistered = (await UserEvent.query().where('eventId', '=', eventId).andWhere('userId', '=', 1)).length;
    if (!event) throw new Error();
    res.render('event', { title: event.title, event: event, isUserRegistered: isUserRegistered, DateTime: DateTime });
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
    await validateEventHasNotPassed(eventId);
    await UserEvent.query().insert({ eventId: eventId, userId: 1 });
    res.sendStatus(201);
  } catch (error: any) {
    console.log('Error:', error);
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
    await validateEventHasNotPassed(eventId);
    await UserEvent.query().delete().where('eventId', '=', eventId).andWhere('userId', '=', 1);
    res.sendStatus(204);
  } catch (error: any) {
    console.log('Error:', error);
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

const validateEventHasNotPassed = async (eventId: number) => {
  const event: any = await Event.query().findById(eventId);
  if (event.date < Date.now()) {
    throw new Error('Event date has passed');
  }
};

export default { getEventList, getEvent, registerForEvent, unregisterFromEvent, getCalendarByUserId };
