import { token, user } from '@prisma/client';

export type UserForInsertion = Omit<user, 'user_id'>;

export type UserForSignIn = Omit<user, 'user_id' | 'role_id' | 'mail_address'>;

export type SignInResponse = {
    success: boolean;
    message: string;
    forgot_pwd?: string;
};

export type TokenForInsertion = Omit<token, 'token_id' | 'token_status'>;

export type Credentials = {
    accessToken: string;
    refreshToken: string;
};
