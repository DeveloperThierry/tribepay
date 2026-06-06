import express from 'express';
import * as ServicesController from '../controllers/services.js';

const router = express.Router();
router.get('/', ServicesController.getServices);
router.post('/', ServicesController.createService);
router.get('/:id/contributions', ServicesController.getContributions);
router.get('/:id', ServicesController.getServiceById);
router.patch('/:id', ServicesController.updateService);
router.delete('/:id', ServicesController.deleteService);

export default router;
