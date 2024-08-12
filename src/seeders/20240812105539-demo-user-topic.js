"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const userTopics = [];

        for (let i = 0; i < 10; i++) {
            userTopics.push({
                user_id: faker.number.int({ min: 1, max: 10 }),
                topic_id: faker.number.int({ min: 1, max: 10 }),
            });
        }

        await queryInterface.bulkInsert("user_topic", userTopics, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("user_topic", null, {});
    },
};
