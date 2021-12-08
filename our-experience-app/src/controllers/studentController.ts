import { Request, Response, NextFunction } from 'express';
import { pdfUpload } from '../middlewares/multerMiddleware';
const singlePdfUpload = pdfUpload.single('pdfUpload');

const inputtedReqFile = (req: any, filepath: any, mimetype: any) => {
  const { filename, size } = req.file;
  return { filename: filename, filepath: filepath, mimetype: mimetype, size: size };
};

const getUploadPage = (req: Request, res: Response, next: NextFunction) => {
  res.render('studentUpload', { title: 'Upload Resume' });
};

const postUploadPage = (req: Request, res: Response, next: NextFunction) => {
  try {
    singlePdfUpload(req, res, (err: any) => {
      if (err) {
        req.flash('error', err.message);
        return res.status(400).redirect('/student/upload');
      } else {
        if (!req.file) {
          req.flash('error', 'No file selected!');
          return res.status(400).redirect('/student/upload');
        }

        const filepath = req.file.path;
        const mimetype = req.file.mimetype;

        req.flash('success', ['file submitted', `${req.file.path}`]);
        return res.redirect('/student/upload');
      }
    });
  } catch (error: any) {
    next(error);
  }
};

const download = (req: Request, res: Response, next: NextFunction) => {
  res.download('/home/node/app/src/uploads/1638943968657_pdf document test.pdf', (err: any) => {
    if (err) {
      next(err);
    } else {
      console.log('OK FILE DOWNLOADED');
    }
  });
};

export default { getUploadPage, postUploadPage, download };
