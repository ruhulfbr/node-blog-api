"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Post extends Model {
        static associate(models) {
            // Define association here
            Post.belongsTo(models.User, {
                foreignKey: "user_id",
                onDelete: "CASCADE",
            });
            Post.belongsToMany(models.Topic, {
                through: models.PostTopic,
                foreignKey: "post_id",
            });
        }
    }

    Post.init(
        {
            user_id: DataTypes.INTEGER,
            title: {
                type: DataTypes.STRING,
                unique: true,
            },
            slug: {
                type: DataTypes.STRING,
                unique: true,
            },
            type: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },
            content: DataTypes.TEXT("long"),
            status: {
                type: DataTypes.TINYINT,
                defaultValue: 0,
            },
            approved_by: DataTypes.INTEGER,
            approved_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Post",
            tableName: "posts",
            timestamps: true,
            paranoid: true,
        }
    );

    return Post;
};
