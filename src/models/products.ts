import { PrismaClient, Prisma, product } from '@prisma/client';
import { PrismaTransactionalClient, UpdateOrDeleteResult } from '../types';
import { modelCatchResolver, transactionResolver } from '../services/resolver';
import { ProductFilter } from '../types';
import { rowsAffectedCounter } from '../services/general';

const prisma = new PrismaClient();

export const createProduct = async (
    productP: product[],
    tx: PrismaTransactionalClient
): Promise<Prisma.BatchPayload | undefined> => {
    try {
        const result = await tx.product.createMany({
            data: [...productP],
        });

        return result;
    } catch (error) {
        if (error instanceof Error) {
            return modelCatchResolver(error);
        } else {
            throw new Error('Unexpected error');
        }
    }
};

export const getProduct = async (
    productP: ProductFilter,
    tx: any
): Promise<Prisma.BatchPayload | undefined> => {
    try {
        const result = await tx.product.findMany({
            data: {
                ...productP,
            },
        });

        return result;
    } catch (error) {
        if (error instanceof Error) {
            return modelCatchResolver(error);
        } else {
            throw new Error('Unexpected error');
        }
    }
};

export const updateProduct = async (
    products: Partial<product>[]
): Promise<number> => {
    try {
        const counter = 0;
        const rowsAffected = rowsAffectedCounter(counter);

        const { rowsAffected: rowsAffectedReturnValue } =
            await prisma.$transaction(
                async (tx): Promise<UpdateOrDeleteResult> => {
                    for (const i in products) {
                        const element = products[i];
                        const { product_id } = element;

                        delete element?.product_id;

                        const updatedUser = await tx.product.update({
                            where: {
                                product_id,
                            },
                            data: {
                                ...element,
                            },
                        });

                        if (updatedUser) {
                            rowsAffected();
                        }
                    }

                    return transactionResolver({ rowsAffected: counter });
                }
            );

        return rowsAffectedReturnValue;
    } catch (error) {
        if (error instanceof Error) {
            return modelCatchResolver(error);
        } else {
            throw new Error('Unexpected error');
        }
    }
};
