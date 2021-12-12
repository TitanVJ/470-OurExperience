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

const getDownloadById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const documentId = +req.params.id;
    if (!documentId) {
      res.status(404);
      throw new Error('Unable to find the document you were looking for!');
    }

    const document = await Document.query().findById(documentId).where('isDeleted', false);
    if (!document) {
      res.status(404);
      throw new Error('Unable to find the document you were looking for!');
    }
    res.download(document.filepath);
  } catch (error) {
    next(error);
  }
};

const deleteDocumentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docId = +req.params.id;
    if (!docId) {
      res.status(404);
      throw new Error('Invalid document Id');
    }
    const result = await Document.query().patchAndFetchById(docId, { isDeleted: true });
    req.flash('success', `Deleted ${result.filename}`);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export default {
  getListDocumentsByUserId,
  getDownloadById,
  deleteDocumentById
};
