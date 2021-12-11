import express, { Request, Response, NextFunction } from 'express';
import { Company } from '../models/company.model';
import { JobPosting } from '../models/job_posting.model';
import { Document } from '../models/document.model';

const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.redirect('/career/postings');
});

router.get('/postings', async (req: Request, res: Response, next: NextFunction) => {
  const job_posts = await Company.query().withGraphFetched('job_postings');
  res.render('career_postings', { title: 'Current Job Postings', postings: job_posts });
});

router.get('/job/:id', async (req: Request, res: Response, next: NextFunction) => {
  const job: any = await JobPosting.query().findById(req.params.id).withGraphFetched('company');
  // const company: any = await Company.query().findById( job.companyId ).select('name');
  console.log(job);
  res.render('job', { title: job.title, job: job, company: job.company });
});

router.get('/job/:id/apply', async (req: Request, res: Response, next: NextFunction) => {
  const job: any = await JobPosting.query().findById(req.params.id).withGraphFetched('company');
  const userDocuments: Document[] = await Document.query().where('userId', req.user.id);
  const formTypes: any = {
    resume: [],
    coverLetter: [],
    transcript: [],
    sis: []
  };
  userDocuments.forEach((document: Document) => {
    if (document.documentType === 'resume') {
      formTypes.resume.push(document);
    } else if (document.documentType === 'cover-letter') {
      formTypes.coverLetter.push(document);
    } else if (document.documentType === 'transcript') {
      formTypes.transcript.push(document);
    } else if (document.documentType === 'sis') {
      formTypes.sis.push(document);
    }
  });
  res.render('application', { title: `${job.title} - ${job.company.name}`, job: job, formTypes: formTypes });
});

export = router;
