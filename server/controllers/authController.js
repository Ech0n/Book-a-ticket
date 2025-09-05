import { hash, compare } from '../auth/passwordManager.js';
import { createNewUser, getUserByEmail } from '../queries/userQueries.js';
import { sign, addToken, clearToken } from '../auth/jwtManager.js';
import createError from 'http-errors';
import { registerSchema } from '../schemas/registerSchema.js';
import { loginSchema } from '../schemas/loginSchema.js';
import { validateSchema } from '../middleware/validationMiddleware.js';

export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = validateSchema(
        req.body,
        registerSchema,
    );

    const passwordHash = await hash(password);
    await createNewUser({ firstName, lastName, email, passwordHash });

    res.status(201).json({ message: 'User registered successfully' });
};

const FAKE_PASSWORD_HASH =
    '$2b$10$CjwKCAiA6L6fBhBCEiwAjwUxHkLVpLl8P0eBfK5zyqU5ZX6FZjKvW.';

export const loginUser = async (req, res) => {
    const { email, password } = validateSchema(req.body, loginSchema);

    const user = await getUserByEmail(email);
    const hashToCompare = user ? user.passwordHash : FAKE_PASSWORD_HASH;
    const passwordMatch = await compare(password, hashToCompare);

    if (!user && !passwordMatch) {
        throw createError(401, 'Authentication failed');
    }

    const token = sign({ email: user.email });
    addToken(res, token);

    res.status(200).json({ message: 'Logged in' });
};

export const logoutUser = async (req, res) => {
    clearToken(res);
    res.status(200).json({ message: 'Logged out' });
};