import express from 'express';
import eventController from '../controllers/eventController';

const router = express.Router();

router.get('', eventController.getEventList);
router.get('/my-calendar', eventController.getCalendarByUserId);
router.get('/:id', eventController.getEvent);
router.post('/:id', eventController.registerForEvent);

export = router;
