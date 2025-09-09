import { Op } from 'sequelize';
import db from '../models/index.js';

export const getEventsByUserQuery = async (userId) => {
    const participations = await db.Participation.findAll({
        where: { userId },
        attributes: ['eventId']
    });

    const eventIds = participations.map(p => p.eventId);

    const events = await db.Event.findAll({
        where: {
            id: { [Op.in]: eventIds }
        }
    });
    return events;
};

export const addParticipationQuery = async (userId, eventId) => {
    try {
        const participation = await db.Participation.create({ userId, eventId, reservationDate: new Date() });
        return participation;
    } catch (error) {
        console.error('Error adding participation:', error);
        throw new Error('Database error');
    }
};

export const removeParticipationQuery = async (userId, eventId) => {
    try {
        const result = await db.Participation.destroy({
            where: { userId, eventId }
        });
        return result > 0;
    } catch (error) {
        console.error('Error removing participation:', error);
        throw new Error('Database error');
    }
}
