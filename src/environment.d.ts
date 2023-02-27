declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            CTX: string;
            host: string;
            user: string;
            password: string;
            database: string;
            max: number;
            idleTimeoutMillis: number;
            connectionTimeoutMillis: number;
            SENDER_EMAIL: string;
            SENDER_PWD: string;
            SALT_ROUNDS: number
        }
    }
}

export {};
