import { user } from '@prisma/client';

declare global {
    namespace Express {
        export interface Request {
            user: user;
        }
    }
}

export {};
