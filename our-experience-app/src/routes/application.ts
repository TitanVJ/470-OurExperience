import express, { Request, Response, NextFunction } from 'express';
import { JobApplication } from '../models/job_application.model';

const router = express.Router();

router.get('', async (req: Request, res: Response, next: NextFunction) => {
  const applications = await JobApplication.query().withGraphFetched('posting');
  console.log('APPS:', applications);
  res.render('application_list', { title: 'My Job Applications', applications: applications });
});

export = router;
