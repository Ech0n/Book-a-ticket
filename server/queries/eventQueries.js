import createError from 'http-errors';
import db from '../db/models/index.js';

export const getAllEvents = async () => {
    const events = await db.Event.findAll();
    return events;
};

export const addEventQuery = async (name, subtitle, date, time, endDate, endTime, description) => {
    try {
        console.log(name);
        const event = await db.Event.create({ name, subtitle, date, time, endDate, endTime, description });
        return event;
    } catch (error) {
        console.error('Error adding event:', error);
        throw new Error('Database error');
    }
};

export const getAllFeaturedEvents = async () => {
    const featured = await db.FeaturedEvent.findAll({
        include: [{
            model: db.Event,
            as: 'event',
            required: true
        }],
    });
    return featured;
};


export const getEventById = async (eventId) => {
    const event = await db.Event.findByPk(eventId);
    return event;
};
