import express from 'express';
import { refreshToken } from '../controllers/token';

const router = express.Router();

router.route('/').post(refreshToken);

export default router;
