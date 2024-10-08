import { Request, Response } from 'express';
import {
    controllerCatchResolver,
    controllerTransactionResolver,
} from '../services/resolver';
import { PrismaClient } from '@prisma/client';
import { createProduct as createProductFromModel } from '../models/products';

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { body } = req;

        const { code, message, result } = await prisma.$transaction(
            async (tx) => {
                const insertedProducts = await createProductFromModel(body, tx);

                return controllerTransactionResolver({
                    code: 200,
                    message: 'The products have been inserted successfully',
                    result: insertedProducts,
                });
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
            /* istanbul ignore next */
            res.status(500).json({ code: 500, message: 'Unexpected error' });
        }
    }
};
