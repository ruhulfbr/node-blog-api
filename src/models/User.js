"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class User extends Model {
        static associate(models) {
            // Define association here
            User.hasMany(models.Post, {
                foreignKey: "user_id",
                onDelete: "CASCADE",
            });
            User.hasMany(models.PostTopic, {
                foreignKey: "user_id",
                onDelete: "CASCADE",
            });
            User.hasMany(models.UserTopic, {
                foreignKey: "user_id",
                onDelete: "CASCADE",
            });
        }
    }

    User.init(
        {
            name: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            email_verified_at: DataTypes.DATE,
            password: DataTypes.STRING,
            avatar: DataTypes.STRING,
            status: {
                type: DataTypes.TINYINT,
                defaultValue: 1,
            },
            role: {
                type: DataTypes.TINYINT,
                defaultValue: 0,
            },
            rememberToken: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
            tableName: "users",
            timestamps: true,
            paranoid: true,
        }
    );

    return User;
};
