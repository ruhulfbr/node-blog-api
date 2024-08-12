"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const postTopics = [];

        for (let i = 0; i < 10; i++) {
            postTopics.push({
                post_id: faker.number.int({ min: 1, max: 10 }),
                topic_id: faker.number.int({ min: 1, max: 10 }),
            });
        }

        await queryInterface.bulkInsert("post_topic", postTopics, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("post_topic", null, {});
    },
};
