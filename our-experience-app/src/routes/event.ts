import express from 'express';
import eventController from '../controllers/eventController';

const router = express.Router();

router.get('', eventController.getEventList);
router.get('/:id', eventController.getEvent);

export = router;
