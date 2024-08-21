import { getRoles } from '../../src/models/role';
import { Role } from '../../src/types';

describe('Role model', () => {
    describe('getRoles', () => {
        test('With 1 or more records in the table', async () => {
            const result: Array<Role> = await getRoles();
            expect(result.length).toBeGreaterThan(0);
        });
    });
});

// export const main = () =>{

// };
