import { Model, Sequelize } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Participation extends Model {
        static associate(models) {
            Participation.belongsTo(models.User, { foreignKey: 'userId' });
            Participation.belongsTo(models.Event, { foreignKey: 'eventId' });
        }
    }

    Participation.init({
        reservationDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, { sequelize, modelName: 'Participation' });

    return Participation;
};
