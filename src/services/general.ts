export const isString = (stringFromRequest: any): boolean => {
    return typeof stringFromRequest === 'string';
};

export const isDate = (dateFromRequest: string): boolean => {
    return Boolean(Date.parse(dateFromRequest));
};

export const isInteger = (numberFromRequest: string): boolean => {
    return Boolean(Number.parseInt(numberFromRequest));
};

export const isBuffer = (bufferFromRequest: any): boolean => {
    return Buffer.isBuffer(bufferFromRequest);
};

export const rowsAffectedCounter = (counter: number) => {
    return (): number => {
        counter += 1;
        return counter;
    };
};

export const isValidJSON = ( possibleJson: string ): boolean => {
    return Boolean( JSON.parse( possibleJson ) );
};
