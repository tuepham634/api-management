import { Router } from 'express';
import authRoutes from './auth.router';

const router = Router();

router.use('/auth', authRoutes);

export default router;
