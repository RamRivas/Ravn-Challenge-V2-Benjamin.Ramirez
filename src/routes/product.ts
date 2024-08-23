import express from 'express';
import { createProduct } from '../controllers/products';
import { verifyToken } from '../middlewares/token';
import { verifyEndpointAccess } from '../middlewares/role';

const router = express.Router();

router.route('/').post(verifyToken, verifyEndpointAccess, createProduct);

export default router;
