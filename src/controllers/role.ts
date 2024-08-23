import { getRoles } from '../models/role';
import { Request, Response } from 'express';

export const getAllRolesController = async (_req: Request, res: Response) => {
    try {
        const result = await getRoles();

        return res.json({
            code: 200,
            ...result,
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json( { code: 400, message: error.message } );
        } else {
            return res.status(500).json( { code: 500, message: 'Unexpected error' } );
        }
    }
};
