import { Router } from 'express';
import userRouter from './users.routes';

const apiRouter = Router();
apiRouter.use('/user', userRouter);

const baseRouter = Router();
baseRouter.use('/api', apiRouter);

export default baseRouter;
