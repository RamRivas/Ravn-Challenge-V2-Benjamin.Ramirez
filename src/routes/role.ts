import express from 'express';
import { getAllRolesController } from '../controllers/role';

const router = express.Router();

router.route( '/' ).get( getAllRolesController );

export default router;