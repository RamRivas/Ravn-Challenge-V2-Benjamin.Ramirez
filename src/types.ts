import {
    // PrismaClient,
    token,
    user,
} from '@prisma/client';
// import { PrismaClientOptions } from '@prisma/client/runtime/library';

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

export type VerifiedUser = Omit<SignInResponse, 'message'> & {
    user?: user;
};

export interface UpdateOrDeleteResult {
    rowsAffected: number;
}

export type TokenForInsertion = Omit<
    token,
    'token_id' | 'token_status' | 'destroy_date'
>;

export interface JwtPayload {
    user?: user;
    iat: number;
    exp: number;
}

export interface ProcessEnv {
    PORT: string;
    CTX: string;
    SALT_ROUNDS: number;
    SENDER_EMAIL: string;
    SENDER_PWD: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
}

export interface Credentials {
    accessToken: string;
    refreshToken: string;
    session: token;
}

export interface ControllerResponse {
    code: number;
    message: string;
    result?: any;
}
