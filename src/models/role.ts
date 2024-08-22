import { PrismaClient } from '@prisma/client';
import { modelCatchResolver } from '../services/resolver';
import { RoleFilter, RoleWithHttpMethodsAndEndpoints } from '../types';

const prisma = new PrismaClient();

export const getRoles = async ( roleFilter: RoleFilter = {} ): Promise<RoleWithHttpMethodsAndEndpoints[]> => {
    try {
        const result = await prisma.role.findMany( {
            where: {
                ...roleFilter
            },
            include: {
                endpoint_role_method: {
                    include: {
                        http_method: true,
                        endpoint: true,
                    },
                }
            }
        } );

        return result;
    } catch (error) {
        if (error instanceof Error) {
            return modelCatchResolver(error);
        } else {
            throw new Error('Unexpected error');
        }
    }
};