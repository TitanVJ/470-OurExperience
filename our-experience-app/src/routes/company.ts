import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('probaby redirect to a list of all companies, idk?? 🤷‍♂️');
});

router.get('/:company_name', (req: Request, res: Response, next: NextFunction) => {
  // look up the company things from db then build the response
  res.render('company', { title: req.params.company_name , company: {"name": req.params.company_name}, jobs: [] });
});

export = router;
