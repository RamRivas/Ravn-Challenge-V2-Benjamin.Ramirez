import { PrismaClient } from '@prisma/client';
import { modelCatchResolver } from '../services/resolver';
// import { EndpointRoleMethodJoined, RoleFilter } from '../types';
import { RoleFilter } from '../types';

const prisma = new PrismaClient();

// export const getRoles = async ( roleFilter: RoleFilter = {} ): Promise<Array< EndpointRoleMethodJoined | role >>  => {
export const getRoles = async ( roleFilter: RoleFilter = {} )  => {
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