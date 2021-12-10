import express, { Request, Response, NextFunction } from 'express';
import job_postings_controller from '../controllers/job_postings.controller';

const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.redirect('/career/postings');
});

router.get('/postings', job_postings_controller.get_all_jobs);

router.get('/job/:id', job_postings_controller.job_details);

export default router;
