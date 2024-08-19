import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config';
import { PrismaClient, token, user } from '@prisma/client';
import { modelCatchResolver } from '../services/resolver';
import { Credentials, TokenForInsertion } from '../types';

const prisma = new PrismaClient();

export const generateAccessToken = (user: user): string => {
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
        if (error instanceof Error) {
            return modelCatchResolver(error);
        } else {
            throw new Error('Unexpected error');
        }
    }
};

export const getToken = (
    tokenP: Partial<token> = {},
    otherFilters: object = {}
) => {
    try {
        return prisma.token.findMany({
            where: {
                ...tokenP,
                ...otherFilters,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            return modelCatchResolver(error);
        } else {
            throw new Error('Unexpected error');
        }
    }
};

export const insertToken = async (
    tokenToInsert: TokenForInsertion,
    tx: any
): Promise<token> => {
    try {
        return await tx.token.create({
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

export const signUser = async (user: user, tx: any): Promise<Credentials> => {
    try {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        const { user_id } = user;

        const token = {
            refresh_token: refreshToken,
            creation_date: new Date(),
            user_id,
        };

        const recordset = await getToken({ user_id, token_status: '1' });

        if (recordset.length > 0)
            throw new Error('There is another active session for this user');

        await insertToken(token, tx);

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
