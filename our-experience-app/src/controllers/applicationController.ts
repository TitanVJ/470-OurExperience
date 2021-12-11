import { Request, Response, NextFunction } from 'express';
import { JobApplication } from '../models/job_application.model';
const { DateTime } = require('luxon');

const getApplicationListByUserId = async (req: Request, res: Response, next: NextFunction) => {
  const HARD_CODED_ID = 1;
  const applications = await JobApplication.query().findByIds([HARD_CODED_ID]).where('isDeleted', '=', '0').withGraphJoined('posting.[company]');
  res.render('application_list', { title: 'My Job Applications', applications: applications, DateTime: DateTime, applicationDeadlinePassed: applicationDeadlinePassed });
};

const deleteApplicationById = async (req: Request, res: Response, next: NextFunction) => {
  const applicationId = +req.params.id;
  if (!applicationId) {
    res.sendStatus(400);
    return;
  }
  await JobApplication.query().findById(applicationId).patch({ isDeleted: true });
  res.sendStatus(204);
};

const applicationDeadlinePassed = (deadline: any): boolean => {
  return DateTime.now() > deadline;
};

export default { getApplicationListByUserId, deleteApplicationById };
