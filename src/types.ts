import { token, user } from '@prisma/client';
import { Request } from 'express';

export type UserForInsertion = Omit<user, 'user_id' | 'forgot_pwd'>;

export type UserForSignIn = Omit<
    user,
    'user_id' | 'role_id' | 'mail_address' | 'forgot_pwd'
>;

export type SignInResponse = Partial<Credentials> & {
    success: boolean;
    message: string;
    forgot_pwd?: string;
    user?: user;
};

export interface VerifiedUser {
    signInResponse: SignInResponse;
    user: user;
}

export type TokenForInsertion = Omit<
    token,
    'token_id' | 'token_status' | 'destroy_date'
>;

export interface Credentials {
    accessToken: string;
    refreshToken: string;
}

export interface AuthenticatedRequest extends Request {
    user: user;
}
