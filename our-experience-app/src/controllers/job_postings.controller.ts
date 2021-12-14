import { Request, Response, NextFunction } from 'express';
import { Company } from '../models/company.model';
import { JobPosting } from '../models/job_posting.model';

// Read
const get_all_jobs = async (req: Request, res: Response, next: NextFunction) => {
  const job_posts = await JobPosting.query().withGraphFetched('company');

  if(req.user.role == 'Staff') {
    const companies = await Company.query();
    res.render('admin/jobs', { title: 'Manage Job Posts', job_posts: job_posts, companies: companies});

  }else{
    res.render('career_postings', { title: 'Current Job Postings', postings: job_posts });

  }
};

const job_details = async (req: Request, res: Response, next: NextFunction) => {
  const job: any = await JobPosting.query().findById(req.params.id).withGraphFetched('company');
  const payload = { title: job.title, job: job, company: job.company };

  if(req.user.role == 'Staff') {
    res.render('admin/job', payload);
  }else{
    res.render('job', payload);
  }
};

const job_data = async (req: Request, res: Response, next: NextFunction) => {
  const job = await JobPosting.query().findById(req.params.id).withGraphFetched('company');
  res.send( job );
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
const update_job = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Update request for Job Post with ID: ' + req.body.id, req.body);

  try {
    const updated_job = await JobPosting.query().findById( req.body.id )
    .patch({
      deadline: req.body.deadline,
      description: req.body.description,
      title: req.body.title
    });
    req.flash('success', 'Successfully updated Job Post with ID: ' + req.body.id );
  } catch (error) {
    req.flash('error', 'Error while attempting to update Job Post with ID: ' + req.body.id );
  }
  res.redirect('/admin/jobs');
};

// Delete
const delete_job = async (req: Request, res: Response, next: NextFunction) => {
  try{
    await JobPosting.query().deleteById( req.body.id);

    req.flash('success', 'Deleted Job Post with ID: '+req.body.id);
  } catch (error) {
    req.flash('error', 'Error while deleting Job Post with ID: '+ req.body.id);
  }
  res.redirect('/admin/jobs');

};

export default { get_all_jobs, job_details, job_data, create_job, update_job, delete_job }
