import { RoleWithHttpMethodsAndEndpoints } from '../types';
import { getRoles } from '../models/role';
import { isInteger, isString } from './general';

export const isValidRole = async (
    roleFromRequest: number
): Promise<boolean> => {
    try {
        const roles: Array<RoleWithHttpMethodsAndEndpoints> = await getRoles();
        return (
            roles.find((current) => current.role_id === roleFromRequest) !=
            undefined
        );
    } catch (error) {
        /* istanbul ignore next */
        if (error instanceof Error) {
            throw error;
        } else {
            /* istanbul ignore next */
            throw new Error('Unexpected error');
        }
    }
};

export const parseRole = async (roleFromRequest: any): Promise<number> => {
    try {
        if (!isString(roleFromRequest) && !isInteger(roleFromRequest)) {
            throw new Error('Incorrect format or missing role');
        }
        if (!(await isValidRole(roleFromRequest))) {
            throw new Error('The given role does not exist');
        }
        return roleFromRequest;
    } catch (error) {
        /* istanbul ignore next */
        if (error instanceof Error) {
            throw error;
        } else {
            /* istanbul ignore next */
            throw new Error('Unexpected error');
        }
    }
};
