import { Request, Response, NextFunction } from 'express';
import { pdfUpload } from '../middlewares/multerMiddleware';
const singlePdfUpload = pdfUpload.single('pdfUpload');
import { Document } from '../models/document.model';

const inputtedReqFile = (req: any, filepath: any, mimetype: any) => {
  const { filename, size } = req.file;
  return { filename: filename, filepath: filepath, mimetype: mimetype, size: size };
};

const getUploadPage = (req: Request, res: Response, next: NextFunction) => {
  const csrfToken = req.csrfToken();
  console.log(csrfToken);
  res.render('studentUpload', { title: 'Upload Document', csrfToken: csrfToken });
};

const postUploadPage = async (req: Request, res: Response, next: NextFunction) => {
  singlePdfUpload(req, res, async (err: any) => {
    try {
      if (err) {
        req.flash('error', err.message);
        return res.status(400).redirect('/student/upload');
      } else {
        if (!req.file) {
          req.flash('error', 'No file selected!');
          return res.status(400).redirect('/student/upload');
        }

        // can submit file to db
        const filepath = req.file.path;
        const mimetype = req.file.mimetype;

        const newDocument = {
          userId: req.user.id,
          filepath: req.file.path,
          mimeType: req.file.mimetype,
          documentType: req.body.docType,
          filename: req.file.filename
        };

        const document = await Document.query().insert(newDocument);
        if (!document) {
          throw new Error('Unable to save to database');
        }

        req.flash('success', ['file submitted', `${req.file.filename}`]);
        return res.redirect('/student/upload');
      }
    } catch (error) {
      next(error);
    }
  });
};

export default { getUploadPage, postUploadPage };
