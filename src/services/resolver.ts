import config from '../config';
import { isValidJSON } from '../services/general';
import { Response } from 'express';

const { CTX } = config;

export const transactionResolver = (result: any): any => {
    if (CTX === 'test') {
        throw new Error(JSON.stringify({ CTX, ...result }));
    }
    return result;
};

export const controllerTransactionResolver = (result: any): any => {
    if (CTX === 'test') {
        throw new Error(JSON.stringify({ sucess: true, CTX, ...result }));
    }
    return result;
};

export const modelCatchResolver = (obj: Error): any => {
    if (CTX === 'test') {
        if (isValidJSON(obj.message)) {
            return JSON.parse(obj.message);
        }
    }
    throw obj;
};

export const controllerCatchResolver = (obj: Error, res: Response) => {
    if (isValidJSON(obj.message)) {
        const customError = JSON.parse(obj.message);
        const { code } = customError;
        if (CTX === 'test') {
            res.status(code).json({ CTX, ...customError } );
            return;
        } else {
            res.status(code).json({...customError});
        }
    } else {
        res.status(500).json( { code: 500, message: obj.message } );
    }
};
