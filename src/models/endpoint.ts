import { PrismaClient } from '@prisma/client';
import {
    EndpointWithHttpMethods,
    EndpointFilter,
    EndpointRoleMethodFilter,
} from '../types';
import { modelCatchResolver } from '../services/resolver';

const prisma = new PrismaClient();

export const getEndpoint = async (
    endpointFilter: EndpointFilter = {},
    endpointRoleMethodFilter: EndpointRoleMethodFilter = {}
): Promise<EndpointWithHttpMethods[]> => {
    try {
        const result = await prisma.endpoint.findMany({
            where: {
                ...endpointFilter,
            },
            include: {
                endpoint_role_method: {
                    include: {
                        http_method: true,
                    },
                    where: {
                        ...endpointRoleMethodFilter,
                    },
                },
            },
        });

        return result;
    } catch (error) {
        /* istanbul ignore next */
        if (error instanceof Error) {
            return modelCatchResolver(error);
        } else {
            /* istanbul ignore next */
            throw new Error('Unexpected error');
        }
    }
};
