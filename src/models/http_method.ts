import { PrismaClient } from '@prisma/client';
import { HttpMethodFilter } from '../types';
import { modelCatchResolver } from '../services/resolver';

const prisma = new PrismaClient();

export const getEndpoint = async (httpMethodFilter: HttpMethodFilter = {}) => {
    try {
        const result = await prisma.http_method.findMany({
            where: {
                ...httpMethodFilter,
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
