import express from 'express';
import {
    forgotPassword,
    logOut,
    logOutNoAuth,
    signInController,
    signUpController,
} from '../controllers/user';
import { verifyToken } from '../middlewares/token';

const router = express.Router();

router.route('/signUp').post(signUpController);

router.route('/signIn').post(signInController);

router.route('/forgotPassword').patch(forgotPassword);

router.route('/logOut').delete(verifyToken, logOut);

router.route('/logOutNoAuth').post(logOutNoAuth);

export default router;
