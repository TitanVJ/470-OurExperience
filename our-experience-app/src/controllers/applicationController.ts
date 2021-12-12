import { Request, Response, NextFunction } from 'express';
import { JobApplication } from '../models/job_application.model';
const { DateTime } = require('luxon');

const getApplicationListByUserId = async (req: Request, res: Response, next: NextFunction) => {
  const userId = +req.user.id;
  if (!userId) {
    res.sendStatus(401);
    return;
  }
  const applications = await JobApplication.query().where('userId', '=', userId).where('isDeleted', '=', '0').withGraphJoined('posting.[company]');
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
