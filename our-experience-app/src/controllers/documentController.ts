import { Request, Response, NextFunction } from 'express';

const getListDocuments = (req: Request, res: Response, next: NextFunction) => {
  res.send('route');
};

const getDownloadById = (req: Request, res: Response, next: NextFunction) => {
  res.send('route');
};

export default {
  getListDocuments,
  getDownloadById
};
