declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            PORT: string;
            CTX: string;
            SALT_ROUNDS: string;
            DATABASE_URL: string;
            SENDER_EMAIL: string;
            SENDER_PWD: string;
            ACCESS_TOKEN_SECRET: string;
            REFRESH_TOKEN_SECRET: string;
        }
    }
}

export {};
