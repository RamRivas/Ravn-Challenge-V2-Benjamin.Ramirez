import { CTX } from '../config';
import { isValidJSON } from '../services/general';
import { Response } from 'express';

export const transactionResolver = (result: any): any => {
    if (CTX === 'dev') {
        throw new Error(JSON.stringify({ success: true, CTX, result }));
    }
    return result;
};

export const controllerTransactionResolver = (result: any): any => {
    if (CTX === 'dev') {
        throw new Error(JSON.stringify({ sucess: true, CTX, ...result }));
    }
    return result;
};

export const modelCatchResolver = (obj: Error): any => {
    if (CTX === 'dev') {
        if (isValidJSON(obj.message)) {
            return JSON.parse(obj.message);
        }
    }
    throw obj;
};

export const controllerCatchResolver = (obj: Error, res: Response) => {
    if (CTX === 'dev') {
        // console.log( obj.message );
        if (isValidJSON(obj.message)) {
            const customError = JSON.parse(obj.message);
            const { code } = customError;
            res.status(code).json(customError);
            return;
        }
    }
    res.status(500).send(obj.message);
};
