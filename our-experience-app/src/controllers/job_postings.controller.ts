import { Request, Response, NextFunction } from 'express';
import { Company } from '../models/company.model';
import { JobPosting } from '../models/job_posting.model';

// Read
const get_all_jobs = async (req: Request, res: Response, next: NextFunction) => {
  let role = req.session.cas_userinfo.role;
  const job_posts = await Company.query().withGraphFetched('job_postings');
  res.render((role === 'admin')? 'admin_jobs': 'career_postings', { title: 'Current Job Postings', postings: job_posts });
};

const job_details = async (req: Request, res: Response, next: NextFunction) => {
  const job: any = await JobPosting.query().findById(req.params.id).withGraphFetched('company');
  res.render('job', { title: job.title, job: job, company: job.company });
};

// Create
const create_job = async (req: Request, res: Response, next: NextFunction) => {
  const new_job = await JobPosting.query()
    .insert({
      companyId: req.params.companyId,
      deadline: req.params.deadline,
      description: req.params.description,
      title: req.params.title
    });
};

// Update
const update_job = (req: Request, res: Response, next: NextFunction) => {

};

// Delete
const delete_job = (req: Request, res: Response, next: NextFunction) => {

};

export default { get_all_jobs, job_details, create_job, update_job, delete_job }
