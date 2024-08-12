"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const namesArray = [
            "PHP",
            "HTML",
            "CSS",
            "JavaScript",
            "SQL",
            "React",
            "Vue.js",
            "Angular",
            "Node.js",
            "Express.js",
            "Django",
            "Ruby",
            "Python",
            "Java",
            "Spring Boot",
            "Swift",
            "Kotlin",
            "Flutter",
            "Xamarin",
            "Svelte",
        ];

        const topics = namesArray.map((name) => ({
            name: name,
            status: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert("topics", topics, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("topics", null, {});
    },
};
