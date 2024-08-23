import { getRoles } from '../src/models/role';

describe('Role model', () => {
    describe('getRoles', () => {
        test('With 1 or more records in the table', async () => {
            const result = await getRoles();
            expect(result.length).toBeGreaterThan(0);
        });
    });
    describe('getRoles with filte params', () => {
        test('With 1 or more records in the table', async () => {
            const result = await getRoles({});
            expect(result.length).toBeGreaterThan(0);
        });
    });
});

// export const main = () =>{

// };
