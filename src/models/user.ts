import {
    UserForInsertion,
    UserForSignIn,
    SignInResponse,
    VerifiedUser,
    UpdateOrDeleteResult,
} from '../types';
import { compare } from 'bcrypt';
import { rowsAffectedCounter } from '../services/general';
import { modelCatchResolver, transactionResolver } from '../services/resolver';
import { PrismaClient, user } from '@prisma/client';
import { signUser } from '../models/token';

const prisma = new PrismaClient();

export const signUp = async (userToInsert: UserForInsertion): Promise<user> => {
    try {
        return await prisma.$transaction(async (tx): Promise<user> => {
            const result = await tx.user.create({
                data: {
                    ...userToInsert,
                },
            });

            return transactionResolver(result);
        });
    } catch (error) {
        /* istanbul ignore next */
        if (error instanceof Error) {
            return modelCatchResolver(error);
        } else {
            /* istanbul ignore next */
            throw new Error('Unexpected error');
        }
    }
};

// export const getAllUsers = async (): Promise<user[]> => {
//     try {
//         return await prisma.user.findMany();
//     } catch (error) {
//         /* istanbul ignore next */
//          if (error instanceof Error) {
//             return modelCatchResolver(error);
//         } else {
//             /* istanbul ignore next */
//             throw new Error('Unexpected error');
//         }
//     }
// };

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
        /* istanbul ignore next */
        if (error instanceof Error) {
            return modelCatchResolver(error);
        } else {
            /* istanbul ignore next */
            throw new Error('Unexpected error');
        }
    }
};

export const updateUser = async (
    users: Array<Partial<user>>
): Promise<number> => {
    try {
        const counter = 0;
        const rowsAffected = rowsAffectedCounter(counter);

        const { rowsAffected: rowsAffectedReturnValue } =
            await prisma.$transaction(
                async (tx): Promise<UpdateOrDeleteResult> => {
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
                }
            );

        return rowsAffectedReturnValue;
    } catch (error) {
        /* istanbul ignore next */
        if (error instanceof Error) {
            return modelCatchResolver(error);
        } else {
            /* istanbul ignore next */
            throw new Error('Unexpected error');
        }
    }
};

export const verifyPassword = async (
    credentials: UserForSignIn,
    tx: any
): Promise<VerifiedUser> => {
    try {
        const { user_name, pwd } = credentials;

        const result = await tx.user.findFirst({
            where: {
                user_name: user_name,
            },
        });

        if (result) {
            return {
                success: await compare(pwd, result.pwd),
                user: result,
            };
        } else {
            return {
                success: false,
            };
        }
    } catch (error) {
        /* istanbul ignore next */
        if (error instanceof Error) {
            throw error;
        } else {
            /* istanbul ignore next */
            throw new Error('Unexpected error');
        }
    }
};

export const signIn = async (
    credentials: UserForSignIn
): Promise<SignInResponse> => {
    try {
        return await prisma.$transaction(
            async (tx): Promise<SignInResponse> => {
                const verifiedUser = await verifyPassword(credentials, tx);

                const { success, user: userFromCredentials } = verifiedUser;

                if (success && userFromCredentials) {
                    const { accessToken, refreshToken } = await signUser(
                        userFromCredentials,
                        tx
                    );
                    return transactionResolver({
                        success,
                        message: 'Now you are logged in',
                        accessToken,
                        refreshToken,
                    });
                } else {
                    throw new Error(
                        JSON.stringify({
                            success: false,
                            message:
                                'The given username or password is not correct',
                        })
                    );
                }
            }
        );
    } catch (error) {
        /* istanbul ignore next */
        if (error instanceof Error) {
            return modelCatchResolver(error);
        } else {
            /* istanbul ignore next */
            throw new Error('Unexpected error');
        }
    }
};
