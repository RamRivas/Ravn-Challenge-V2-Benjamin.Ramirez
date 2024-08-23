import { main } from '../src';
import supertest from 'supertest';

const agent = supertest.agent(main());
const baseUrl = '/api/user';

describe('User', () => {
    describe('signIn', () => {
        test('When the user is not found', async () => {
            const userToSign = {
                user_name: 'obladiOblada',
                pwd: '123',
            };

            const response = await agent
                .post(`${baseUrl}/signIn`)
                .send(userToSign);

            expect(response.status).toBe(400);
            expect(response.body.message).toBe(
                'The given username or password is not correct'
            );
        });

        test('When the given password is wrong', async () => {
            const userToSign = {
                user_name: 'bramirez',
                pwd: '456',
            };

            const response = await agent
                .post(`${baseUrl}/signIn`)
                .send(userToSign);

            expect(response.status).toBe(400);
            expect(response.body.message).toBe(
                'The given username or password is not correct'
            );
        });

        test('When the signIn is successful', async () => {
            const userToSign = {
                user_name: 'bramirez',
                pwd: '123',
            };

            const response = await agent
                .post(`${baseUrl}/signIn`)
                .send(userToSign);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('accessToken');
            expect(response.body).toHaveProperty('refreshToken');
        });
    });

    describe('signUp', () => {
        test('When user_name already exists on database', async () => {
            const body = {
                user_name: 'jramirez',
                mail_address: 'rambenrial@gmail.com',
                pwd: '123',
                role: 1,
            };

            const response = await agent.post(`${baseUrl}/signUp`).send(body);

            expect(response.status).toBe(400);
            expect(response.body.message).toBe(
                'The given username already exists'
            );
        });

        test('When user_name has not a correct value', async () => {
            const body = {
                user_name: 4876876,
                mail_address: 'rambenrial@gmail.com',
                pwd: '123',
                role: 1,
            };

            const response = await agent.post(`${baseUrl}/signUp`).send(body);

            // console.log( response.body );
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(
                'Incorrect format or missing user name'
            );
        });

        test('When mail_address has not a correct value', async () => {
            const body = {
                user_name: 'jbenavidez',
                mail_address: 4578632,
                pwd: '123',
                role: 1,
            };

            const response = await agent.post(`${baseUrl}/signUp`).send(body);

            // console.log( response.body );
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(
                'The given email address is not valid'
            );
        });

        test('When pwd has not a correct value', async () => {
            const body = {
                user_name: 'jbenavidez',
                mail_address: 'jbenavidez@gmail.com',
                pwd: 123,
                role: 1,
            };

            const response = await agent.post(`${baseUrl}/signUp`).send(body);

            // console.log( response.body );
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(
                'Incorrect format or missing pwd'
            );
        });

        test('When role has not a correct value', async () => {
            const body = {
                user_name: 'jbenavidez',
                mail_address: 'jbenavidez@gmail.com',
                pwd: '123',
                role: '1',
            };

            const response = await agent.post(`${baseUrl}/signUp`).send(body);

            // console.log( response.body );
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('The given role does not exist');
        });

        test('When signUp is executed successfully', async () => {
            const body = {
                user_name: 'jbenavidez',
                mail_address: 'jbenavidez@gmail.com',
                pwd: '123',
                role: 1,
            };

            const response = await agent.post(`${baseUrl}/signUp`).send(body);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe(
                'You have signed up in "Tiny Store"'
            );
        });

    });
    describe( 'logOut', () => {
        test( 'When access_token is not provided', async () => {
            const response = await agent.delete(`${baseUrl}/logOut`);

            expect(response.status).toBe(401);
            expect(response.body.message).toBe(
                'No token provided!'
            );
        } );
        
        test( 'When access_token is not valid', async () => {
            const response = await agent.delete(`${baseUrl}/logOut`).set('Authorization', 'Bearer YellowSubmarine');

            expect(response.status).toBe(403);
            expect(response.body.message).toBe(
                'Forbidden'
            );
        } );

        test( 'When access_token is expired', async () => {
            const response = await agent.delete(`${baseUrl}/logOut`).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEyLCJ1c2VyX25hbWUiOiJicmFtaXJleiIsInB3ZCI6IiQyYiQxMCRHME1ZNk9hbko3SldUcUw4Ujc1US8uTTlkVnBGbFUuZDdHeVJ4eDVVMjhSaW1weTh2bUp2LiIsInJvbGVfaWQiOjEsImZvcmdvdF9wd2QiOiIwIiwibWFpbF9hZGRyZXNzIjoicmFtYmVucmlhbEBnbWFpbC5jb20ifSwiaWF0IjoxNzI0Mzg4ODc5LCJleHAiOjE3NTU0OTI4Nzl9.7VxEvQ1SPO7WN9oUlGWGtw72bo8g9oudCATqgFLPqIk');

            expect(response.status).toBe(403);
            expect(response.body.message).toBe(
                'Forbidden'
            );
        } );

        // test( 'When logout is executed successfully', async () => {
        //     process.env.CTX = 'dev';
            

        //     const response = await agent.delete(`${baseUrl}/logOut`).set('Authorization', 'Bearer ');

        //     expect(response.status).toBe(403);
        //     expect(response.body.message).toBe(
        //         'Forbidden'
        //     );
        //     process.env.CTX = 'test';
        // } );
    } );
});
