import express from 'express';
import documentController from '../controllers/documentController';

const router = express.Router();

router.get('/', documentController.getListDocuments);

router.get('/:id/download', documentController.getDownloadById);

export = router;
