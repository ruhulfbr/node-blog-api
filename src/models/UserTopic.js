"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class UserTopic extends Model {
        static associate(models) {
            // Define association here
            UserTopic.belongsTo(models.User, { foreignKey: "user_id" });
            UserTopic.belongsTo(models.Topic, { foreignKey: "topic_id" });
        }
    }

    UserTopic.init(
        {
            user_id: DataTypes.INTEGER,
            topic_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "UserTopic",
            tableName: "user_topic",
            timestamps: false,
        }
    );

    return UserTopic;
};
