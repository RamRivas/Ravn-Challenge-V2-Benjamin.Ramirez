import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { controllerCatchResolver } from '../services/resolver';
import { getTokens } from '../models/token';

const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = config;

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const {
            body: { token },
        } = req;

        if (!token || token?.length === 0) {
            res.status(401).json({ code: 401, message: 'No token provided!' });
            return;
        } else {
            const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
            if (decoded && typeof decoded === 'object') {
                const { user: decodedUser } = decoded;
                const { user_id } = decodedUser;

                const sessions = await getTokens({ user_id });
                if (sessions.length > 0) {
                    const newToken = jwt.sign(
                        { user: decodedUser },
                        ACCESS_TOKEN_SECRET,
                        {
                            expiresIn: '10m',
                        }
                    );
                    res.status(200).json({
                        code: 200,
                        accessToken: newToken,
                    });
                } else {
                    res.status(401).json({
                        code: 401,
                        message:
                            'The given token is expired or does not have active sessions',
                    });
                }
            } else {
                res.status(403).json({
                    code: 403,
                    message: 'Forbidden!',
                });
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            controllerCatchResolver(error, res);
        } else {
            /* istanbul ignore next */
            res.status(500).json({ code: 500, message: 'Unexpected error' });
        }
    }
};
