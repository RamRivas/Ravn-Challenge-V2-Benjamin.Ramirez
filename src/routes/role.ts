import express from 'express';
import { getAllRolesController } from '../controllers/role';
import { verifyToken } from '../middlewares/token';
import { verifyEndpointAccess } from '../middlewares/role';

const router = express.Router();

router.route('/').get(verifyToken, verifyEndpointAccess, getAllRolesController);

export default router;
