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

router.post('/create_job', job_posting_controller.create_job);

router.put('/update_job/:id', job_posting_controller.update_job);

router.delete('/delete_job/:id', job_posting_controller.delete_job);

router.get('/companies');

router.get('/company/:id');

router.get('/users')

export default router;
