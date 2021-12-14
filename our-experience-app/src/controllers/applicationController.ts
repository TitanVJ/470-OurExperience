import { Request, Response, NextFunction } from 'express';
import { JobApplication } from '../models/job_application.model';
const { DateTime } = require('luxon');

const DATE_FORMAT_OPTIONS = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'America/Vancouver' };

const getApplicationListByUserId = async (req: Request, res: Response, next: NextFunction) => {
  const userId = +req.user.id;
  if (!userId) {
    res.sendStatus(401);
    return;
  }
  try {
    const applications = await JobApplication.query().where('userId', '=', userId).where('isDeleted', '=', '0').withGraphJoined('posting.[company]');
    const csrfToken = req.csrfToken();
    res.render('application_list', {
      title: 'My Job Applications',
      applications: applications,
      DateTime: DateTime,
      options: DATE_FORMAT_OPTIONS,
      applicationDeadlinePassed: applicationDeadlinePassed,
      csrfToken: csrfToken
    });
  } catch (error: any) {
    next(error);
  }
};

const deleteApplicationById = async (req: Request, res: Response, next: NextFunction) => {
  const applicationId = +req.params.id;
  if (!applicationId) {
    res.sendStatus(400);
    return;
  }
  try {
    await JobApplication.query().findById(applicationId).patch({ isDeleted: true });
    res.sendStatus(204);
  } catch (error: any) {
    next(error);
  }
};

const applicationDeadlinePassed = (deadline: any): boolean => {
  return DateTime.now() > deadline;
};

export default { getApplicationListByUserId, deleteApplicationById };
