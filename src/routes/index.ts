import user from './user';
import role from './role';
import token from './token';

const userRoutes = {
    prefix: '/user',
    router: user,
};

const roleRoutes = {
    prefix: '/role',
    router: role,
};

const tokenRoutes = {
    prefix: '/token',
    router: token,
};

export default [userRoutes, roleRoutes, tokenRoutes];
