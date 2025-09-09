export default {
    async up(queryInterface, Sequelize) {
        const events = await queryInterface.sequelize.query(
            `SELECT id FROM "Events";`
        )
        const eventRows = events[0];
        const FEATURED_EVENTS_NUM = 6
        const featuredEvents = eventRows.slice(0, FEATURED_EVENTS_NUM).map(event => {
            return ({
                eventId: event.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
        });
        await queryInterface.bulkInsert('FeaturedEvents', featuredEvents);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('FeaturedEvents', null, {});
    },
};