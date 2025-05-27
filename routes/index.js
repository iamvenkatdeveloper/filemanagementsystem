import { Router } from 'express';
import fileRoutes from './fileRoutes.js';

const router = Router();
router.use('/', fileRoutes);

export default router;
