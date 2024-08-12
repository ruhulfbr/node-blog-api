"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class PostTopic extends Model {
        static associate(models) {
            // Define association here
            PostTopic.belongsTo(models.Post, { foreignKey: "post_id" });
            PostTopic.belongsTo(models.Topic, { foreignKey: "topic_id" });
        }
    }

    PostTopic.init(
        {
            post_id: DataTypes.INTEGER,
            topic_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "PostTopic",
            tableName: "post_topic",
            timestamps: false,
        }
    );

    return PostTopic;
};
