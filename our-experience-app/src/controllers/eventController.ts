import { Request, Response, NextFunction } from 'express';

const getEventList = (req: Request, res: Response, next: NextFunction) => {
  res.render('index', { title: 'Events' });
};

const getCalendarByUserId = (req: Request, res: Response, next: NextFunction) => {};

export default { getEventList, getCalendarByUserId };
