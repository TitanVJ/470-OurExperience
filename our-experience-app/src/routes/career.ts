import express, { Request, Response, NextFunction } from 'express';
import job_postings_controller from '../controllers/job_postings.controller';
import careerController from '../controllers/careerController';

const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.redirect('/career/postings');
});

router.get('/postings', job_postings_controller.get_all_jobs);

router.get('/job/:id', job_postings_controller.job_details);

router.get('/job/:id/apply', careerController.getJobApply);

router.post('/job/:id/apply', careerController.postJobApply);

export = router;
