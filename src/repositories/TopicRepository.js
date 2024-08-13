const { Topic, Post } = require("../models");
const { Op } = require("sequelize");

/**
 * Get all topics with optional filters.
 * @param {Object} filters
 * @param {number} [limit=10]
 * @returns {Promise<Object>}
 */
const getTopicsWithFilter = async (filters = {}, limit = 10) => {
    const query = {
        where: {},
        limit,
        order: [["id", "DESC"]],
    };

    if (filters.name) {
        query.where.name = {
            [Op.like]: `%${filters.name}%`,
        };
    }

    return Topic.findAndCountAll(query);
};

/**
 * Find a topic by ID.
 * @param {number} id
 * @returns {Promise<Topic>}
 */
const findById = async (id) => {
    return Topic.findByPk(id);
};

/**
 * Find a topic by name.
 * @param {string} name
 * @returns {Promise<Topic>}
 */
const findByName = async (name) => {
    return Topic.findOne({
        where: { name: name },
    });
};

/**
 * Get a topic's posts with pagination.
 * @param {Topic} topic
 * @param {number} [limit=10]
 * @returns {Promise<Object>}
 */
const getTopicPostsWithPagination = async (topic, limit = 10) => {
    return topic.getPosts({
        limit,
        order: [["id", "DESC"]],
    });
};

/**
 * Create a new topic.
 * @param {Object} data
 * @returns {Promise<Topic>}
 */
const createTopic = async (data) => {
    return Topic.create(data);
};

/**
 * Update a topic's information.
 * @param {Topic} topic
 * @param {Object} data
 * @returns {Promise<Topic>}
 */
const updateTopic = async (topic, data) => {
    await topic.update(data);
    return topic;
};

/**
 * Delete a topic (soft delete).
 * @param {Topic} topic
 * @returns {Promise<boolean>}
 */
const deleteTopic = async (topic) => {
    return topic.destroy(); // Assuming soft delete is set up in your model
};

/**
 * Permanently delete a topic.
 * @param {Topic} topic
 * @returns {Promise<boolean>}
 */
const permanentDeleteTopic = async (topic) => {
    return topic.destroy({ force: true }); // Permanent delete
};

module.exports = {
    getTopicsWithFilter,
    findById,
    findByName,
    getTopicPostsWithPagination,
    createTopic,
    updateTopic,
    deleteTopic,
    permanentDeleteTopic,
};
