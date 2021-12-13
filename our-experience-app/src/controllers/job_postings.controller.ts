import { Request, Response, NextFunction } from 'express';
import { Company } from '../models/company.model';
import { JobPosting } from '../models/job_posting.model';

// Read
const get_all_jobs = async (req: Request, res: Response, next: NextFunction) => {
  const role = req.session.cas_userinfo.role;
  // const job_posts = await Company.query().withGraphFetched('job_postings');
  const job_posts = await JobPosting.query().withGraphFetched('company');
  if(role == 'admin') {
    const companies = await Company.query();
    res.render('admin_jobs', { title: 'Manage Job Posts', job_posts: job_posts, companies: companies});

  }else{
    res.render('career_postings', { title: 'Current Job Postings', postings: job_posts });

  }
};

const job_details = async (req: Request, res: Response, next: NextFunction) => {
  const job: any = await JobPosting.query().findById(req.params.id).withGraphFetched('company');
  res.render('job', { title: job.title, job: job, company: job.company });
};

// Create
const create_job = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const new_job = await JobPosting.query()
    .insert({
      companyId: req.body.companyId,
      deadline: req.body.deadline,
      description: req.body.description,
      title: req.body.title
    });

    if(new_job instanceof JobPosting) {
      req.flash('success', 'NEW JOB POST CREATED!!');
    } else {
      throw Error;
    }
  } catch {
    req.flash('error', 'Error while attempting to create new job post.');
  }
  res.redirect('/admin/jobs/');
};

// Update
const update_job = (req: Request, res: Response, next: NextFunction) => {
};

// Delete
const delete_job = (req: Request, res: Response, next: NextFunction) => {

};

export default { get_all_jobs, job_details, create_job, update_job, delete_job }
