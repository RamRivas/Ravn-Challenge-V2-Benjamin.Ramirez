import { PrismaClient, role } from '@prisma/client';

const prisma = new PrismaClient();

export const GetAllRoles = async (): Promise<Array<role>> => {
    try {
        const result = await prisma.role.findMany();

        return result;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('Unexpected error');
        }
    }
};
