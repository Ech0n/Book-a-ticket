import { getAllEvents, getAllFeaturedEvents } from '../queries/eventQueries.js';

export const getEvents = async (req, res) => {
    const events = await getAllEvents();
    res.json(events);
};

export const getFeatured = async (req, res) => {
    const events = await getAllFeaturedEvents();
    res.json(events);
};
