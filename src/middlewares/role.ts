import { NextFunction, Request, Response } from 'express';
import { controllerCatchResolver } from '../services/resolver';
import { getEndpoint } from '../models/endpoint';

export const verifyEndpointAccess = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { user } = req;

        if( user ) {
            const { role_id } = user;
            const [ endpointAccess ] = await getEndpoint( { endpoint_name: req.originalUrl }, { role_id } );

            if( endpointAccess ) {
                const { endpoint_role_method } = endpointAccess;
                const http_methodAccess = endpoint_role_method.find( ( current: any ) => current.http_method.method_name === req.method );

                if( http_methodAccess ) {
                    next();
                } else { 
                    res.status( 405 ).send('The session owner has not access to this request');
                }
            } else { 
                res.status( 405 ).send('The session owner has not access to this request');
            }
        } else {
            res.status( 401 ).send( 'The session owner has not been verified' );
        }

    } catch (error) {
        if (error instanceof Error) {
            controllerCatchResolver(error, res);
        } else {
            res.status(500).send('Unexpected error');
        }
    }
};