import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  next( createError(404, `Not found - ${req.originalUrl}`) );
};

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
};

export default {
  notFound,
  errorHandler
};

// THIS SEPERATES THE MIDDLEWARE FOR HANNDLING ERRORS
// can be part of app.js(this case server.js) however