import { Request, Response, NextFunction } from 'express';

const getEventList = (req: Request, res: Response, next: NextFunction) => {
  res.render('event_list', { title: 'Events', events: [{ title: 'Test Event', location: 'Test Location', date: 'Dec 13, 2021, 1:25 AM' }] });
};

const getCalendarByUserId = (req: Request, res: Response, next: NextFunction) => {};

export default { getEventList, getCalendarByUserId };
