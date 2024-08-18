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

// export type UserForUpdate = Pick<User, 'user_id'> & { updateValues: Array<KeyValuePair> }

export type SignInResponse = {
    success: boolean;
    message: string;
    forgot_pwd?: string;
};

export enum LogicOperator {
    And = 'AND',
    Or = 'OR',
}

export type FilterParameter = {
    key: string;
    value: any;
    operator: string;
    logicOperator?: LogicOperator;
};

export type KeyValuePair = {
    key: string;
    value: any;
};

export type JoinParameter = {
    joinType: string;
    tableName: string;
    filters: Array<FilterParameter>;
};

export interface Token {
    refresh_token: string;
    token_status: number;
    creation_date: Date;
}

export type PreparedQuery = {
    name: string;
    text: string;
    values: Array<any>;
};
