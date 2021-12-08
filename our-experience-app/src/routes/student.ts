import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.redirect('/student/dashboard');
});

router.get('/dashboard', (req: Request, res: Response, next: NextFunction) => {
  res.render('dashboard', { title: '🖥 Dashboard', message: '🔨 Under Construction 🔨' });
});

/* student upload pdf file*/
router.get('/upload', (req: Request, res: Response, next: NextFunction) => {
  req.flash('success', 'wait lol');
  res.render('studentUpload', { title: 'Upload Resume' });
});

export = router;
