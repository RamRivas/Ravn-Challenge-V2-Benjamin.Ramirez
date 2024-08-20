import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../config';
import { isValidJSON } from '../services/general';
import { controllerCatchResolver } from '../services/resolver';

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
            jwt.verify(token, ACCESS_TOKEN_SECRET, (error, decoded) => {
                if (error) {
                    res.status(403).send('Unauthorized!');
                }
                if (typeof decoded === 'string' && isValidJSON(decoded)) {
                    req.user = JSON.parse(decoded);
                    next();
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
