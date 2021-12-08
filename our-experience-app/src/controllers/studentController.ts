import { Request, Response, NextFunction } from 'express';
import { pdfUpload } from '../middlewares/multerMiddleware';

const getUploadPage = (req: Request, res: Response, next: NextFunction) => {
  res.render('studentUpload', { title: 'Upload Resume' });
};

const postUploadPage = (req: Request, res: Response, next: NextFunction) => {
  pdfUpload(req, res, (err: any) => {
    if (err) {
      req.flash('error', err.message);
      return res.status(400).redirect('/student/upload');
    } else {
      if (!req.file) {
        req.flash('error', 'No file selected!');
        return res.status(400).redirect('/student/upload');
      }
      req.flash('success', ['file submitted', `uploads/${req.file.filename}`]);
      return res.redirect('/student/upload');
    }
  });
};

export default { getUploadPage, postUploadPage };
