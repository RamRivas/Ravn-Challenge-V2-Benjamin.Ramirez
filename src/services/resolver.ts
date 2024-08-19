import { CTX } from '../config';
import { isValidJSON } from '../services/general';

export const transactionResolver = (result: any) : any => {
    if (CTX === 'dev'){
        throw new Error(JSON.stringify({ success: true, CTX, result }));
    }
    return result;
};

export const modelCatchResolver = (obj: Error) : any => {
    if (CTX === 'dev') {
        if (isValidJSON(obj.message)) {
            return JSON.parse(obj.message);
        }
    }
    throw obj;
};
