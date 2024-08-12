"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const posts = [];

        for (let i = 0; i < 10; i++) {
            posts.push({
                user_id: 1,
                title: faker.lorem.sentence(),
                slug: faker.helpers.slugify(faker.lorem.sentence()),
                type: 1,
                content: faker.lorem.paragraphs(5),
                status: 1,
                approved_by: null,
                approved_at: null,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            });
        }

        await queryInterface.bulkInsert("posts", posts, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("posts", null, {});
    },
};
