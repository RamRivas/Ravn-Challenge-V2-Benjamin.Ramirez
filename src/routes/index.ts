import user from './user';
import role from './role';

const userRoutes = {
    prefix: '/user',
    router: user,
};

const roleRoutes = {
    prefix: '/role',
    router: role,
};

export default [
    userRoutes,
    roleRoutes
];
