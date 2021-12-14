import express from 'express';
import applicationController from '../controllers/applicationController';

const router = express.Router();

router.get('', applicationController.getApplicationListByUserId);
router.delete('/:id', applicationController.deleteApplicationById);

export = router;
