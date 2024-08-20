import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { controllerCatchResolver } from '../services/resolver';
import { getTokens } from '../models/token';

const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = config;

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const {
            body: {
                token
            }
        } = req;

        if (!token || token?.length === 0) {
            return res.status(401).send('No token provided!');
        } else {
            const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET );
            if (decoded && typeof decoded === 'object') {
                const { user: decodedUser } = decoded;
                const { user_id } = decodedUser;
    
                const sessions = await getTokens({ user_id });
                if (sessions.length > 0) {
                    const newToken = jwt.sign(
                        { ID_User: decoded },
                        ACCESS_TOKEN_SECRET,
                        {
                            expiresIn: '10m',
                        }
                    );
                    return res.status(200).send({
                        accessToken: newToken,
                    });
                } else {
                    return res.status(401).send(
                        'The given token is expired or does not have active sessions'
                    );
                }
            }
        }
        return res.status( 403 ).send('Forbidden!');
    } catch (error) {
        if (error instanceof Error) {
            return controllerCatchResolver(error, res);
        } else {
            return res.status(400).send('Unexpected error');
        }
    }
};
