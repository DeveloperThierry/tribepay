import express from 'express';
import * as ContribController from '../controllers/contributions.js';

const router = express.Router();

router.get('/service/:id', ContribController.getContributions);
router.post('/', ContribController.createContribution);
router.patch('/:id', ContribController.togglePaidStatus);

export default router;