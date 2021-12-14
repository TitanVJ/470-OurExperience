import express, {Request, Response, NextFunction} from 'express';
import admin_controller from '../controllers/admin.controller';
import company_controller from '../controllers/company.controller';
import job_posting_controller from '../controllers/job_postings.controller';

const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.redirect('/admin/dashboard/');
});

router.get('/dashboard', admin_controller.dashboard);

// Job postings related CRUD routes
router.get('/jobs', job_posting_controller.get_all_jobs);

router.get('/job/:id', job_posting_controller.job_details);

router.get('/job/data/:id', job_posting_controller.job_data);

router.post('/job/create', job_posting_controller.create_job);

router.post('/job/update/', job_posting_controller.update_job);

router.post('/job/delete', job_posting_controller.delete_job);

// Company related CRUD routes
router.get('/companies', company_controller.get_all_companies);

router.get('/company/:id', company_controller.company_details);

router.get('/company/data/:id', company_controller.company_data);

router.post('/company/create', company_controller.create_company);

router.post('/company/update', company_controller.update_company);

router.post('/company/delete', company_controller.delete_company);

router.get('/users')

export default router;
