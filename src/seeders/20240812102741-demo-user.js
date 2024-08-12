"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const users = [];

        for (let i = 0; i < 10; i++) {
            users.push({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                email_verified_at: faker.date.past(),
                password: faker.internet.password(),
                avatar: faker.image.avatar(),
                status: 1, // Default Active
                role: i === 0 ? 1 : 0,
                rememberToken: null,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            });
        }

        await queryInterface.bulkInsert("users", users, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("users", null, {});
    },
};
