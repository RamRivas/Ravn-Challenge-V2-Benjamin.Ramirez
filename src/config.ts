import dotenv from 'dotenv';
import { ProcessEnv } from './types';

dotenv.config();

const {
    PORT,
    CTX,
    SENDER_EMAIL,
    SENDER_PWD,
    SALT_ROUNDS,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
} = process.env;

const config: ProcessEnv = {
    PORT,
    CTX,
    SENDER_EMAIL,
    SENDER_PWD,
    SALT_ROUNDS,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
};

export default config;
