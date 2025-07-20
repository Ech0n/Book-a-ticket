import { events, featuredEvents } from '../mockData.js';

export const getAllEvents = (req, res) => {
    //TODO In future get events from model
    res.json(events);
};

export const getFeatured = (req, res) => {
    //TODO In future get events from model
    res.json(featuredEvents);
};
