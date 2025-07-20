import createError from 'http-errors';
import db from '../db/models/index.js';

export const createNewUser = async (data) => {
    return await db.sequelize.transaction(async (transaction) => {
        const existingUser = await isUserExist(data.email, { transaction });

        if (existingUser) {
            throw createError.Conflict('Email is already in use');
        }

        return await db.User.create(data, { transaction });
    });
};

export const getUserById = async (userId) => {
    const user = await db.User.findByPk(userId);
    return user;
};

export const getUserByEmail = async (email) => {
    const user = await db.User.findOne({ where: { email } });
    return user;
};

export const isUserExist = async (email, options = {}) => {
    const user = await db.User.findOne({
        where: { email },
        attributes: ['id'],
        transaction: options.transaction,
    });
    return !!user;
};

export const updateUser = async (userId, updateData) => {
    await db.User.update(updateData, { where: { id: userId } });
};

export const deleteUser = async (userId) => {
    await db.User.destroy({ where: { id: userId } });
};
