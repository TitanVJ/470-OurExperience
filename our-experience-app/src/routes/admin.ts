import express, {Request, Response, NextFunction} from 'express';
import admin_controller from '../controllers/admin.controller';
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

router.get('/companies');

router.get('/company/:id');

router.get('/users')

export default router;
