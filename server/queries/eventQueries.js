import createError from 'http-errors';
import db from '../db/models/index.js';

export const getAllEvents = async () => {
    const events = await db.Event.findAll();
    return events;
};

export const getAllFeaturedEvents = async () => {
    const featured = await db.FeaturedEvent.findAll({
        include: [{ model: db.Event, as: 'event' }],
    });
    return featured;
};