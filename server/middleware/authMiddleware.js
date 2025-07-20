import { verify, getToken } from '../auth/jwtManager.js';
import { isUserExist } from '../queries/userQueries.js';
import createError from 'http-errors';

export const protectedRoute = async (req, res, next) => {
    const token = getToken(req);
    if (!token) {
        throw createError(401, 'Not authorized');
    }

    const decoded = verify(token);
    const email = decoded.email;
    if (!email) {
        throw createError(401, 'Not authorized');
    }

    const exists = await isUserExist(email);
    if (!exists) {
        throw createError(401, 'Not authorized');
    }

    next();
};
