import express, { Request, Response, NextFunction } from 'express';
import userRoute from './users.routes';
const router = express.Router();

router.use('/user', userRoute);

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.redirect('/student');
});

export = router;
