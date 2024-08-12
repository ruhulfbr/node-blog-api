"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Topic extends Model {
        static associate(models) {
            // Define association here
            Topic.belongsToMany(models.Post, {
                through: models.PostTopic,
                foreignKey: "topic_id",
            });
            Topic.belongsToMany(models.User, {
                through: models.UserTopic,
                foreignKey: "topic_id",
            });
        }
    }

    Topic.init(
        {
            name: {
                type: DataTypes.STRING,
                unique: true,
            },
            status: {
                type: DataTypes.TINYINT,
                defaultValue: 1,
            },
        },
        {
            sequelize,
            modelName: "Topic",
            tableName: "topics",
            timestamps: true,
            paranoid: true,
        }
    );

    return Topic;
};
