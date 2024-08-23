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
import { PrismaClient, user } from '@prisma/client';
import { destroyToken } from '../models/token';
import { controllerCatchResolver } from '../services/resolver';
import { ControllerResponse } from '../types';

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
        /* istanbul ignore next */
        if (error instanceof Error) {
            res.status(400).json({ code: 400, message: error.message });
        } else {
            /* istanbul ignore next */
            res.status(500).json({ code: 500, message: 'Unexpected error' });
        }
    }
};

export const signInController = async (req: Request, res: Response) => {
    try {
        const signInSubject = await parseUserForSignIn(req.body);
        const result = await signIn(signInSubject);

        const { success, message } = result;

        if (!success) {
            throw new Error(JSON.stringify({ code: 400, message }));
        } else {
            res.status(200).json({
                code: 200,
                ...result,
            });
        }
    } catch (error) {
        /* istanbul ignore next */
        if (error instanceof Error) {
            controllerCatchResolver(error, res);
        } else {
            /* istanbul ignore next */
            res.status(500).json({ code: 500, message: 'Unexpected error' });
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
        /* istanbul ignore next */
        if (error instanceof Error) {
            res.status(400).json({
                code: 400,
                message: error.message,
            });
        } else {
            /* istanbul ignore next */
            res.status(500).json({ code: 500, message: 'Unexpected error' });
        }
    }
};

export const logOut = async (req: Request, res: Response) => {
    try {
        const { user } = req;

        if (user) {
            const { user_id } = user;
            const { code, message, result } = await prisma.$transaction(
                async (tx): Promise<ControllerResponse> => {
                    const destroyedTokens = await destroyToken({ user_id }, tx);
                    if (destroyedTokens === 0) {
                        throw new Error(
                            JSON.stringify({
                                code: 400,
                                message:
                                    'There are no current active sessions for the given user',
                            })
                        );
                    }
                    return {
                        code: 200,
                        message: 'Sessions have been closed',
                        result: destroyedTokens,
                    };
                }
            );
            res.status(code).json({
                code,
                message,
                result,
            });
        } else {
            res.status(403);
        }
    } catch (error) {
        /* istanbul ignore next */
        if (error instanceof Error) {
            controllerCatchResolver(error, res);
        } else {
            /* istanbul ignore next */
            res.status(500).json({ code: 500, message: 'Unexpected error' });
        }
    }
};

export const logOutNoAuth = async (req: Request, res: Response) => {
    try {
        const signInSubject = await parseUserForSignIn(req.body);

        const { code, message, result } = await prisma.$transaction(
            async (tx): Promise<ControllerResponse> => {
                const { success, user: verifiedUser } = await verifyPassword(
                    signInSubject,
                    tx
                );

                if (success && verifiedUser) {
                    const { user_id } = verifiedUser;
                    const destroyedTokens = await destroyToken({ user_id }, tx);
                    if (destroyedTokens === 0) {
                        throw new Error(
                            JSON.stringify({
                                code: 400,
                                message:
                                    'There are no current active sessions for the given user',
                            })
                        );
                    }
                    return {
                        code: 200,
                        message: 'Sessions have been closed',
                        result: destroyedTokens,
                    };
                } else {
                    return {
                        code: 400,
                        message: 'The given password is incorrect',
                    };
                }
            }
        );

        res.status(code).json({
            code,
            message,
            result,
        });
    } catch (error) {
        /* istanbul ignore next */
        if (error instanceof Error) {
            controllerCatchResolver(error, res);
        } else {
            res.status(500).json({
                code: 500,
                message: 'Unexpected error',
            });
        }
    }
};
