import { hash, compare } from '../auth/passwordManager.js';
import { createNewUser, getUserByEmail } from '../queries/userQueries.js';
import { sign, writeToCookie } from '../auth/jwtManager.js';
import createError from 'http-errors';

export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await hash(password);
    await createNewUser({ firstName, lastName, email, passwordHash });

    res.status(201).json({ message: 'User registered successfully' });
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
        // If no user is found with the given email,
        // generate a random string for hashing to prevent timing attacks.
        const randomNumber = Math.floor(Math.random() * 10 + 10);
        const randomString = Math.random()
            .toString(36)
            .substring(2, randomNumber);
        await hash(randomString);
        throw createError.Unauthorized('Authentication failed');
    }

    const passwordMatch = await compare(password, user.passwordHash);

    if (!passwordMatch) {
        throw createError.Unauthorized('Authentication failed');
    }

    const token = sign({ email: user.email });
    writeToCookie(res, token);

    res.status(200).json({ message: 'Logged in' });
};

export const logoutUser = async (req, res) => {
    writeToCookie(res, '', 0);
    res.status(200).json({ message: 'Logged out' });
};
