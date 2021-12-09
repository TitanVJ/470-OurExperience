import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('', async (req: Request, res: Response, next: NextFunction) => {
  res.render('application_list', { title: 'My Job Applications', applications: [] });
});

export = router;
