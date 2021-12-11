import express, { Request, Response, NextFunction } from 'express';
import applicationController from '../controllers/applicationController';

const router = express.Router();

router.get('', applicationController.getApplicationListByUserId);

export = router;
