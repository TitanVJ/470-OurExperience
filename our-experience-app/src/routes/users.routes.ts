import { Request, Response, NextFunction, Router } from 'express';
import { User } from '../models/user.model';
import { Company } from '../models/company.model';
import { JobPosting } from '../models/job_posting.model';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // const companies = await Company.query().withGraphFetched('job_postings');
  // res.json(companies);
  const user = req.user;
  res.json({ user: user });
});

export default router;
