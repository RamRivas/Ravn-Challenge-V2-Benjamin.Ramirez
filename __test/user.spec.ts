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

            console.log(response.body);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe(
                'You have signed up in "Tiny Store"'
            );
        });
    });
});
