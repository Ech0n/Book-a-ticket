import { getAllEvents, getAllFeaturedEvents, getEventById, addEventQuery } from '../queries/eventQueries.js';

export const handleGetAllEvents = async (req, res) => {
    const events = await getAllEvents();
    res.json(events);
};

export const handleAddEvent = async (req, res) => {
    const { name, subtitle, date, time, endDate, endTime, description } = req.body;
    const event = await addEventQuery(name, subtitle, date, time, endDate, endTime, description);
    res.json(event);
};

export const handleGetFeatured = async (req, res) => {
    const events = await getAllFeaturedEvents();
    res.json(events);
};

export const handleGetEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await getEventById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
