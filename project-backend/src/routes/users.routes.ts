import { Router } from 'express';
import { User } from '../models/user.model';

const router = Router();

router.get('/', async (req, res, next) => {
  // query with objection for users
  const users = await User.query();
  res.json(users);
});

export default router;
