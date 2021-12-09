import express, { Request, Response, NextFunction } from 'express';
import { JobApplication } from '../models/job_application.model';
const { DateTime } = require('luxon');

const router = express.Router();

router.get('', async (req: Request, res: Response, next: NextFunction) => {
  const applications = await JobApplication.query().withGraphJoined('posting.[company]');
  console.log('APPS:', applications);
  res.render('application_list', { title: 'My Job Applications', applications: applications, DateTime: DateTime });
});

export = router;
