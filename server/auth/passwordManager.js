import bcrypt from 'bcrypt';

export const hash = async (password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
};

export const compare = async (plain, hashed) =>
    await bcrypt.compare(plain, hashed);
