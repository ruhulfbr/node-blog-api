const { body } = require("express-validator");
const TopicStatus = require("../../enums/TopicStatus");
const { TopicRepository: repository } = require("../../repositories");

// Define validation rules
const updateTopic = [
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
            const { topicId } = req.params;
            const existingTopic = await repository.findByName(value);
            if (existingTopic && existingTopic.id !== parseInt(topicId)) {
                throw new Error("Topic name must be unique");
            }
        }),

    body("status")
        .optional()
        .isInt()
        .withMessage("Status must be an integer")
        .custom((value) => {
            if (!TopicStatus.getLabel(value)) {
                throw new Error("Invalid topic status.");
            }

            return true;
        }),
];

module.exports = updateTopic;
