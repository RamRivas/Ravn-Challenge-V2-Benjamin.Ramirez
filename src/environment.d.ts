declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            CTX: string;
            SALT_ROUNDS: number;
            DATABASE_URL: string;
            SENDER_EMAIL: string;
            SENDER_PWD: string;
            ACCESS_TOKEN_SECRET: string;
            REFRESH_TOKEN_SECRET: string;
        }
    }
}

export {};
