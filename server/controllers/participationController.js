import { addParticipationQuery, getEventsByUserQuery, removeParticipationQuery } from '../queries/participationQueries.js';

export const getEventsByUser = async (req, res) => {
    const userId = req.params.userId;
    const events = await getEventsByUserQuery(userId);
    res.json(events);
};

export const addParticipation = async (req, res) => {
    const { userId, eventId } = req.body;
    const participation = await addParticipationQuery(userId, eventId);
    if(participation){
        res.status(201).json(participation);
    } else {
        res.status(400).json({ error: 'Could not add participation' });
    }
};

export const removeParticipation = async (req, res) => {
    const { userId, eventId } = req.body;
    const success = await removeParticipationQuery(userId, eventId);
    res.json({ success });
};