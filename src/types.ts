export interface Role {
    role_id: number;
    role_name: string;
}

export interface User {
    user_id: number;
    user_name: string;
    mail_address: string | null;
    pwd: string;
    role_id: number;
    forgot_pwd?: string;
}

export type UserForInsertion = Omit<User, 'user_id'>;

export type UserForSignIn = Omit<User, 'user_id' | 'role_id' | 'mail_address'>;

export type SignInResponse = {
    success: boolean;
    message: string;
    forgot_pwd?: string;
};

export interface Token {
    refresh_token: string;
    token_status: number;
    creation_date: Date;
}
