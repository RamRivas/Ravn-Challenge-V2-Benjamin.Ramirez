import user from './user';
import role from './role';
import token from './token';
import product from './product';

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

const productRoutes = {
    prefix: '/product',
    router: product,
};

export default [userRoutes, roleRoutes, tokenRoutes, productRoutes];
