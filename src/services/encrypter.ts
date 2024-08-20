import Bcrypt from 'bcrypt';
import config from '../config';

const { SALT_ROUNDS } = config;

export const encrypt = async (toEncrypt: string): Promise<string> => {
    return await Bcrypt.hash(toEncrypt, SALT_ROUNDS as unknown as number);
};
