import {
    // PrismaClient,
    token,
    user
} from '@prisma/client';
// import { PrismaClientOptions } from '@prisma/client/runtime/library';
import { Request } from 'express';

// export type PrismaTransactionalClient = Omit<PrismaClient<PrismaClientOptions, never, DefaultArgs>, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>;
export type UserForInsertion = Omit<user, 'user_id' | 'forgot_pwd'>;

export type UserForSignIn = Omit<
    user,
    'user_id' | 'role_id' | 'mail_address' | 'forgot_pwd'
>;

export type SignInResponse = Partial<Credentials> & {
    success: boolean;
    message: string;
    forgot_pwd?: string;
};

export type VerifiedUser = SignInResponse & {
    user?: user;
};

export interface UpdateOrDeleteResult {
    rowsAffected: number
}

export type TokenForInsertion = Omit<
    token,
    'token_id' | 'token_status' | 'destroy_date'
>;

export interface Credentials {
    accessToken: string;
    refreshToken: string;
}

export interface ControllerResponse {
    code: number,
    message: string,
    result?: any
}