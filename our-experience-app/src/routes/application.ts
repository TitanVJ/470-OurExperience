import express, { Request, Response, NextFunction, application } from 'express';
import applicationController from '../controllers/applicationController';

const router = express.Router();

router.get('', applicationController.getApplicationListByUserId);
router.delete('/:id', applicationController.deleteApplicationById);

export = router;
