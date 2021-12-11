import { Request, Response, NextFunction } from 'express';
import { JobApplication } from '../models/job_application.model';
const { DateTime } = require('luxon');

const getApplicationListByUserId = async (req: Request, res: Response, next: NextFunction) => {
  const applications = await JobApplication.query().withGraphJoined('posting.[company]');
  res.render('application_list', { title: 'My Job Applications', applications: applications, DateTime: DateTime });
};

export default { getApplicationListByUserId };
