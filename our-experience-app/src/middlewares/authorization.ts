import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

const admin = (req: Request, res: Response, next: NextFunction) => {
  if(req.user.role == 'Staff') {
    next();
  } else {
    req.flash('Error', 'Not Authorized');
    res.redirect('/student');
  }
};

const student = (req: Request, res: Response, next: NextFunction) => {
  if(req.user.role == 'Student') {
    next();
  } else {
    res.redirect('/admin');
  }
};

export { admin, student }