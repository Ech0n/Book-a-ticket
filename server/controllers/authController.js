import { hash } from '../auth/passwordManager.js';
import { createNewUser } from '../queries/userQueries.js';

export const registerUser = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    const hashedPassword = await hash(password)
    await createNewUser({firstName, lastName, email, hashedPassword})
   
    res.status(201).json({ message: 'User registered successfully' });
 };
