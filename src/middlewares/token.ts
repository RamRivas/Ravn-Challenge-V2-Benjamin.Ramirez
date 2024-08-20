import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../config';
import { controllerCatchResolver } from '../services/resolver';
import { getTokens } from '../models/token';

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            headers: { authorization },
        } = req;

        const token = authorization?.split(' ')[1];
        if (!token || token?.length === 0) {
            res.status(401).send('No token provided!');
        } else {
            jwt.verify(token, ACCESS_TOKEN_SECRET, async (error, decoded) => {
                if (error ) {
                    res.status(403).send('Unauthorized!');
                } else if( decoded && typeof decoded === 'object' ) {
                    const { user: decodedUser } = decoded;
                    const { user_id } = decoded;

                    const sessions = await getTokens( { user_id } );
                    if( sessions.length > 0 ) {
                        req.user = decodedUser;
                        next();
                    } else {
                        res.status( 403 ).send( 'The given token is expired or does not have active sessions' );
                    }
                } else {
                    throw new Error('Decoded user is not a valid JSON');
                }
            });
        }
    } catch (error) {
        if (error instanceof Error) {
            controllerCatchResolver(error, res);
        } else {
            res.status(500).send('Unexpected error');
        }
    }
};
