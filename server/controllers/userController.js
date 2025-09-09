import jwt from "jsonwebtoken";
import { getToken } from "../auth/jwtManager.js";
import { getUserByEmail } from "../db/queries/userQueries.js";
import createError from "http-errors";

const { verify } = jwt;
const SECRET_KEY = process.env.SECRET_KEY || "dev-secret-key";

export const getCurrentUser = async (req, res, next) => {
    try {
        const token = getToken(req);
        const decoded = verify(token, SECRET_KEY);

        const user = await getUserByEmail(decoded.email);
        if (!user) {
            throw createError(404, 'User not found');
        }

        res.status(200).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });
    } catch (error) {
        next(error);
    }
};
