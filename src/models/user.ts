import { UserForInsertion, UserForSignIn, SignInResponse } from '../types';
import { compare } from 'bcrypt';
import { rowsAffectedCounter } from '../services/general';
import { modelCatchResolver, transactionResolver } from '../services/resolver';
import { PrismaClient, user } from '@prisma/client';
import { signUser } from '../models/token';

const prisma = new PrismaClient();

export const signUp = async (userToInsert: UserForInsertion): Promise<user> => {
    try {
        return await prisma.$transaction(async (tx) => {
            const result = await tx.user.create({
                data: {
                    ...userToInsert,
                },
            });

            return transactionResolver({ insertedUser: result });
        });
    } catch (error) {
        if (error instanceof Error) {
            return modelCatchResolver(error);
        } else {
            throw new Error('Unexpected error');
        }
    }
};

export const getAllUsers = async (): Promise<user[]> => {
    try {
        return await prisma.user.findMany();
    } catch (error) {
        if (error instanceof Error) {
            return modelCatchResolver(error);
        } else {
            throw new Error('Unexpected error');
        }
    }
};

export const filterUsers = async (
    filter: Partial<user>
): Promise<Array<user>> => {
    try {
        return await prisma.user.findMany({
            where: {
                ...filter,
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

export const updateUsers = async (
    users: Array<Partial<user>>
): Promise<number> => {
    try {
        const counter = 0;
        const rowsAffected = rowsAffectedCounter(counter);

        return await prisma.$transaction(async (tx) => {
            for (const i in users) {
                const element = users[i];
                const { user_id } = element;

                delete element?.user_id;

                const updatedUser = await tx.user.update({
                    where: {
                        user_id,
                    },
                    data: {
                        ...element,
                    },
                });

                if (updatedUser) {
                    rowsAffected();
                }
            }

            return transactionResolver({ rowsAffected: counter });
        });
    } catch (error) {
        if (error instanceof Error) {
            return modelCatchResolver(error);
        } else {
            throw new Error('Unexpected error');
        }
    }
};

export const signIn = async (
    credentials: UserForSignIn
): Promise<SignInResponse> => {
    try {
        return await prisma.$transaction(async (tx) => {
            const { user_name, pwd } = credentials;

            const result = await tx.user.findFirst({
                where: {
                    user_name: user_name,
                },
            });

            const signInResponse: SignInResponse = {
                success: false,
                message: '',
            };

            if (result != null) {
                const pwdMatch = await compare(pwd, result.pwd);

                if (pwdMatch) {
                    const { accessToken, refreshToken } = await signUser(
                        result
                    );

                    signInResponse.success = true;
                    signInResponse.message = 'Now you are logged in';
                    signInResponse.accessToken = accessToken;
                    signInResponse.refreshToken = refreshToken;
                } else {
                    signInResponse.success = false;
                    signInResponse.message = 'The given password is incorrect';
                }
            } else {
                signInResponse.success = false;
                signInResponse.message =
                    // eslint-disable-next-line quotes
                    "The given username doesn't exists in our database";
            }

            return signInResponse;
        });
    } catch (error) {
        if (error instanceof Error) {
            return modelCatchResolver(error);
        } else {
            throw new Error('Unexpected error');
        }
    }
};
