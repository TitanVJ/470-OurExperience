import { Request, Response, NextFunction } from 'express';
import { Document } from '../models/document.model';

const getListDocumentsByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const documents = await Document.query().where('userId', req.user.id).where('isDeleted', false);
    const csrfToken = req.csrfToken();
    res.render('document_list', { title: 'Documents', documents: documents, csrfToken: csrfToken });
  } catch (error) {
    next(error);
  }
};

const getDownloadById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const documentId = validateReq(+req.params.id, res);

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

const getViewById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const documentId = validateReq(+req.params.id, res);

    const document = await Document.query().findById(documentId).where('isDeleted', false);
    if (!document) {
      res.status(404);
      throw new Error('Unable to find the document you were looking for!');
    }
    res.sendFile(document.filepath);
  } catch (error) {
    next(error);
  }
};

const deleteDocumentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const documentId = validateReq(+req.params.id, res);
    const document = await Document.query().patchAndFetchById(documentId, { isDeleted: true });
    req.flash('success', `Deleted ${document.filename}`);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const validateReq = (docIdParam: number, res: Response) => {
  const docId = docIdParam;
  if (!docId) {
    res.status(404);
    throw new Error('Invalid document Id');
  }
  return docId;
};

export default {
  getListDocumentsByUserId,
  getDownloadById,
  getViewById,
  deleteDocumentById
};
