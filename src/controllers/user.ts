import {
    filterUsers,
    signIn,
    signUp,
    updateUser,
    verifyPassword,
} from '../models/user';
import { Request, Response } from 'express';
import { parseUserForInsertion, parseUserForSignIn } from '../services/user';
import { randomBytes } from 'crypto';
import * as mailer from '../services/mailer';
import { encrypt } from '../services/encrypter';
import { user } from '@prisma/client';
import { CTX } from '../config';
import { PrismaClient } from '@prisma/client';
import { destroyToken } from '../models/token';
import { AuthenticatedRequest } from '../types';

const prisma = new PrismaClient();

export const signUpController = async (req: Request, res: Response) => {
    try {
        const newUser = await parseUserForInsertion(req.body);
        const insertedUser = await signUp(newUser);

        res.status(200).json({
            code: 200,
            message: 'You have signed up in "Tiny Store"',
            data: insertedUser,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.status(400).send('Unexpected error');
        }
    }
};

export const signInController = async (req: Request, res: Response) => {
    try {
        const signInSubject = await parseUserForSignIn(req.body);
        const signInResponse = await signIn(signInSubject);

        res.status(200).json({
            code: 200,
            message: signInResponse.message,
            data: {
                signInResponse,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            CTX === 'dev' && console.log(error);
            res.status(400).send(error.message);
        } else {
            res.status(400).send('Unexpected error');
        }
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const {
            body: { mail_address },
        } = req;
        const filter: Partial<user> = {
            mail_address,
        };

        const provisionalPwd = randomBytes(8).toString('hex');

        const users = await filterUsers(filter);

        if (users.length > 0) {
            const user = users[0];
            const updateValues = {
                user_id: user.user_id,
                pwd: await encrypt(provisionalPwd),
                forgot_pwd: '1',
            };

            const rowsAffected = await updateUser([updateValues]);

            const body = {
                from: process.env.SENDER_EMAIL,
                to: req.body.mail_address,
                subject: 'Provisional Password',
                html: `<div>Here is your provisional password for Tiny Store: ${provisionalPwd}</div>`,
            };
            mailer.send(body);

            res.status(200).json({
                code: 200,
                message: 'A provisional password was sent to your mail',
                rowsAffected,
            });
        } else {
            throw new Error(
                'There are no users who match with the given filters'
            );
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.status(400).send('Unexpected error');
        }
    }
};

export const logOut = async (req: Request, res: Response) => {
    try {
        const {
            user: { user_id },
        } = req;

        const logOutResult = await prisma.$transaction(async (tx) => {
            return await destroyToken({ user_id }, tx);
        });

        res.status(200).json({
            code: 200,
            message: 'A provisional password was sent to your mail',
            result: logOutResult,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.status(400).send('Unexpected error');
        }
    }
};

export const logOutNoAuth = async (req: Request, res: Response) => {
    try {
        const {
            body: { user_name, pwd },
        } = req;

        const logOutResult = await prisma.$transaction(async (tx) => {
            const {
                user: { user_id },
            } = await verifyPassword({ user_name, pwd }, tx);

            return await destroyToken({ user_id }, tx);
        });

        res.status(200).json({
            code: 200,
            message: 'A provisional password was sent to your mail',
            result: logOutResult,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.status(400).send('Unexpected error');
        }
    }
};
