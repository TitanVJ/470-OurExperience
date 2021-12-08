import express, { Request, Response, NextFunction } from 'express';
import studentController from '../controllers/studentController';
import { pdfUpload } from '../middlewares/multerMiddleware';

const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.redirect('/student/dashboard');
});

router.get('/dashboard', (req: Request, res: Response, next: NextFunction) => {
  res.render('dashboard', { title: '🖥 Dashboard', message: '🔨 Under Construction 🔨' });
});

/* student upload pdf file*/
router.get('/upload', studentController.getUploadPage);

router.post('/upload', pdfUpload.single('pdfUpload'), studentController.postUploadPage);

router.get('/test', studentController.download); // delete this later

export = router;
