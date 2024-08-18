import express from 'express';
import {
    forgotPassword,
    signInController,
    signUpController,
} from '../controllers/user';

const router = express.Router();

router.route('/signUp').post(signUpController);

router.route('/signIn').post(signInController);

router.route('/forgotPassword').patch(forgotPassword);

export default router;
