import { Request, Response, NextFunction } from 'express';
import { JobApplication } from '../models/job_application.model';
const { DateTime } = require('luxon');

const getApplicationListByUserId = async (req: Request, res: Response, next: NextFunction) => {
  const applications = await JobApplication.query().findByIds([1]).withGraphJoined('posting.[company]');
  res.render('application_list', { title: 'My Job Applications', applications: applications, DateTime: DateTime });
};

const deleteApplicationById = async (req: Request, res: Response, next: NextFunction) => {
  await JobApplication.query().findById(1).patch({ isDeleted: true });
};

export default { getApplicationListByUserId, deleteApplicationById };
