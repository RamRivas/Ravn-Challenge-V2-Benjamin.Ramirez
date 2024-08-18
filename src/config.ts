import dotenv from 'dotenv';

dotenv.config();

export const {
    PORT,
    CTX,
    SENDER_EMAIL,
    SENDER_PWD,
    SALT_ROUNDS,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET
} = process.env;
