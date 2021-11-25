import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('jobs_list', {title: "Jobs"});
});

router.get('/:job_id', (req: Request, res: Response, next: NextFunction) => {
    // look up details from db and make response
    res.render('job', { title: "Place Holder Position", details: {}});
});

export = router;
