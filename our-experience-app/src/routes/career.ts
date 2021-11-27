import express, {Request, Response, NextFunction} from 'express';
import { Company } from '../models/company.model';
import { JobPosting } from '../models/job_posting.model';

const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.redirect('/career/postings');
});

router.get('/postings', async (req: Request, res: Response, next: NextFunction) => {
  const job_posts = await Company.query().withGraphFetched('job_postings');
  res.render('career_postings', { title: "Current Job Postings", postings: job_posts });
});

router.get('/job/:id', async (req: Request, res: Response, next: NextFunction) => {
  const job: any = await JobPosting.query().findById( req.params.id ).joinRelated(Company);
  const company: any = await Company.query().findById( job.companyId ).select('name');
  console.log(job, company);
  res.render('job', { title: job.title, job: job, company: company });
});

export = router;
