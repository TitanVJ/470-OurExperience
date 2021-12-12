import { Request, Response, NextFunction } from 'express';
import { Document } from '../models/document.model';

const getListDocumentsByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const documents = await Document.query().where('userId', req.user.id).where('isDeleted', false);
    res.render('document_list', { title: 'Documents', documents: documents });
  } catch (error) {
    next(error);
  }
};

const getDownloadById = (req: Request, res: Response, next: NextFunction) => {
  res.send('route');
};

export default {
  getListDocumentsByUserId,
  getDownloadById
};
