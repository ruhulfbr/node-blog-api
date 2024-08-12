module.exports = {
    up: async (queryInterface, _Sequelize) => {
        await queryInterface.bulkInsert(
            "categories",
            [
                {
                    id: 1,
                    name: "PHP",
                },
                {
                    id: 2,
                    name: "JavaScript",
                },
            ],
            { timestamps: false }
        );
    },

    down: async (queryInterface, _Sequelize) => {
        await queryInterface.bulkDelete("categories", null, {});
    },
};
