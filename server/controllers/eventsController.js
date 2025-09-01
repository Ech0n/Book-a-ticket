import { getAllEvents, addEventQuery, getAllFeaturedEvents } from '../queries/eventQueries.js';

export const getEvents = async (req, res) => {
    const events = await getAllEvents();
    res.json(events);
};

export const addEvent = async (req, res) => {
    const { name, subtitle, date, time, endDate, endTime, description } = req.body;
    const event = await addEventQuery(name, subtitle, date, time, endDate, endTime, description);
    res.json(event);
};

export const getFeatured = async (req, res) => {
    const events = await getAllFeaturedEvents();
    res.json(events);
};
