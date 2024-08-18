import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, CTX } from '../config';
import { PrismaClient, token, user } from '@prisma/client';
import { modelCatchResolver } from '../services/resolver';
import { Credentials, TokenForInsertion } from '../types';

const prisma = new PrismaClient();

const generateAccessToken = (user: user): string => {
    try {
        if (ACCESS_TOKEN_SECRET === undefined)
            throw new Error('Missing ACCESS_TOKEN_SECRET');
        return jwt.sign({ user }, ACCESS_TOKEN_SECRET, { expiresIn: '60m' });
    } catch (error) {
        if (error instanceof Error) {
            return modelCatchResolver(error);
        } else {
            throw new Error('Unexpected error');
        }
    }
};

const generateRefreshToken = (user: user): string => {
    try {
        if (REFRESH_TOKEN_SECRET === undefined)
            throw new Error('Missing REFRESH_TOKEN_SECRET');
        return jwt.sign({ user }, REFRESH_TOKEN_SECRET);
    } catch (error) {
        CTX === 'dev' && console.log(error);
        if (error instanceof Error) {
            return modelCatchResolver(error);
        } else {
            throw new Error('Unexpected error');
        }
    }
};

export const insertToken = async (
    tokenToInsert: TokenForInsertion
): Promise<token> => {
    try {
        return await prisma.token.create({
            data: {
                ...tokenToInsert,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            throw modelCatchResolver(error);
        } else {
            throw new Error('Unexpected error');
        }
    }
};

export const signUser = async (user: user): Promise<Credentials> => {
    try {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        const token = {
            refresh_token: refreshToken,
            creation_date: new Date(),
            user_id: user.user_id
        };

        await insertToken(token);

        return {
            accessToken,
            refreshToken,
        };
    } catch (error) {
        if (error instanceof Error) {
            return modelCatchResolver(error);
        } else {
            throw new Error('Unexpected error');
        }
    }
};
