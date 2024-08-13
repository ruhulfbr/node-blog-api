const { body, param } = require("express-validator");
const { Topic } = require("../../models");
const { TopicRepository: repository } = require("../../repositories");

const createTopic = [
    body("name")
        .trim()
        .not()
        .notEmpty()
        .withMessage("The name field is required")
        .isString()
        .isLength({ max: 20 })
        .withMessage(
            "The name field can have a maximum length of 20 characters"
        )
        .custom(async (value, { req }) => {
            const existingTopic = await repository.findByName(value);
            if (existingTopic) {
                throw new Error("The topic name must be unique");
            }
        }),
];

module.exports = createTopic;
