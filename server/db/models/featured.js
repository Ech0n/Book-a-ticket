import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class FeaturedEvent extends Model {
        static associate(models) {
            FeaturedEvent.belongsTo(models.Event, {
                foreignKey: 'eventId',
                as: 'event',
            });
        }
    }

    FeaturedEvent.init(
        {
            eventId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Events',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                unique: true,
            },
        },
        {
            sequelize,
            modelName: 'FeaturedEvent',
        },
    );

    return FeaturedEvent;
};
