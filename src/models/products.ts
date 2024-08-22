import {
    //PrismaClient,
    product,
} from '@prisma/client';
import { PrismaTransactionalClient } from '../types';
import { modelCatchResolver, transactionResolver } from '../services/resolver';

// const prisma = new PrismaClient();

export const createProduct = async (
    productP: product,
    tx: PrismaTransactionalClient
): Promise<product[] | undefined> => {
    try {
        const result = await tx.product.createMany({
            data: {
                ...productP,
            },
        });

        return transactionResolver(result);
    } catch (error) {
        if (error instanceof Error) {
            return modelCatchResolver(error);
        } else {
            throw new Error('Unexpected error');
        }
    }
};
