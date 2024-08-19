import express from 'express';
import {
    forgotPassword,
    logOut,
    signInController,
    signUpController,
} from '../controllers/user';

const router = express.Router();

router.route('/signUp').post(signUpController);

router.route('/signIn').post(signInController);

router.route('/forgotPassword').patch(forgotPassword);

router.route('/logOut').delete(logOut);

router.route('/logOutNoAuth').post(forgotPassword);

export default router;
