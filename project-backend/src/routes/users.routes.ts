import { Router } from 'express';
import { User } from '../models/user.model';
import { Company } from '../models/company.model';
import { JobPosting } from '../models/job_posting.model';

const router = Router();

router.get('/', async (req, res, next) => {
  // query with objection for users
  // const users = await User.query();
  // res.json(users);

  const companies = await Company.query().joinRelated('pets');
  res.json(companies);

  // const jobPostings = await JobPosting.query().joinRelated('company');
  // res.json(jobPostings);
});

export default router;
