import { Request, Response, NextFunction } from 'express';
import { Event } from '../models/event.model';
import { UserEvent } from '../models/user_event.model';
const { DateTime } = require('luxon');

const DATE_FORMAT_OPTIONS = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'America/Vancouver' };

const getEventList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await Event.query().select('Event.*', Event.relatedQuery('attendees').count().as('attendeeCount'));
    res.render('event_list', { title: 'Events', events: events, DateTime: DateTime, options: DATE_FORMAT_OPTIONS });
  } catch (error: any) {
    next(error);
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
    const isUserRegistered = (
      await UserEvent.query()
        .where('eventId', '=', eventId)
        .andWhere('userId', '=', +req.user.id)
    ).length;
    if (!event) {
      res.status(404);
      throw new Error();
    }
    const csrfToken = req.csrfToken();
    res.render('event', { title: event.title, event: event, isUserRegistered: isUserRegistered, DateTime: DateTime, options: DATE_FORMAT_OPTIONS, csrfToken: csrfToken });
  } catch (error: any) {
    next(error);
  }
};

const registerForEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = +req.params.id;
  if (!eventId) {
    res.sendStatus(400);
    return;
  }
  try {
    const eventInfo: any = await Event.query().findById(eventId).select('Event.capacity', Event.relatedQuery('attendees').count().as('attendeeCount'));
    if (eventInfo.attendeeCount >= eventInfo.capacity) {
      res.status(400);
      throw new Error('Event registration cap already hit!');
    }
    await validateEventHasNotPassed(eventId, res);
    await UserEvent.query().insert({ eventId: eventId, userId: +req.user.id });
    res.sendStatus(201);
  } catch (error: any) {
    console.log('Error:', error);
    next(error);
  }
};

const unregisterFromEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = +req.params.id;
  if (!eventId) {
    res.sendStatus(400);
    return;
  }
  try {
    await validateEventHasNotPassed(eventId, res);
    await UserEvent.query()
      .delete()
      .where('eventId', '=', eventId)
      .andWhere('userId', '=', +req.user.id);
    res.sendStatus(204);
  } catch (error: any) {
    console.log('Error:', error);
    next(error);
  }
};

const getCalendarByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userEvents: any = await UserEvent.query()
      .withGraphFetched('event')
      .where('userId', '=', +req.user.id);
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
    next(error);
  }
};

const validateEventHasNotPassed = async (eventId: number, res: Response) => {
  const event: any = await Event.query().findById(eventId);
  if (event.date < Date.now()) {
    res.status(400);
    throw new Error('Event date has passed');
  }
};

export default { getEventList, getEvent, registerForEvent, unregisterFromEvent, getCalendarByUserId };
