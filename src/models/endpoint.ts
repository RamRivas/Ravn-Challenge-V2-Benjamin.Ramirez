import { PrismaClient } from '@prisma/client';
import { EndpointWithHttpMethods, EndpointFilter, EndpointRoleMethodFilter } from '../types';
import { modelCatchResolver } from '../services/resolver';

const prisma = new PrismaClient();

export const getEndpoint = async ( endpointFilter: EndpointFilter = {}, endpointRoleMethodFilter: EndpointRoleMethodFilter = {} ): Promise<EndpointWithHttpMethods[]> => {
    try {
        const result = await prisma.endpoint.findMany( {
            where: {
                ...endpointFilter
            },
            include: {
                endpoint_role_method: {
                    include: {
                        http_method: true
                    },
                    where: {
                        ...endpointRoleMethodFilter
                    }
                },
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