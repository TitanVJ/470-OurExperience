import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.redirect('/career/postings');
});

router.get('/postings', (req: Request, res: Response, next: NextFunction) => {
  res.render('career_postings', { title: "Current Job Postings", postings: [{ name: "SFU" }, { name: "UBC" }, { name: "UViC" }, { name: "UoT" }, ] });
});

router.get('/job/:id', (req: Request, res: Response, next: NextFunction) => {
  res.render('job', { title: "Job Title", job_details: { desc : "placeholder" } });
});

export = router;
