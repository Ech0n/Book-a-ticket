import { addParticipationQuery, getEventsByUserQuery } from '../queries/participationQueries.js';

export const getEventsByUser = async (req, res) => {
    const userId = req.params.userId;
    const events = await getEventsByUserQuery(userId);
    res.json(events);
};

export const addParticipation = async (req, res) => {
    const { userId, eventId } = req.body;
    const participation = await addParticipationQuery(userId, eventId);
    res.json(participation);
};
