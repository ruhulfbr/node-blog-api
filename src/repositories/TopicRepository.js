const { Topic, Post } = require("../models");
const { Op } = require("sequelize");

class TopicRepository {
    constructor(limit = 10) {
        this._limit = limit;
    }

    /**
     * Get all topics with optional filters.
     * @param {Object} filters
     * @returns {Promise<Object>}
     */
    async getTopicsWithFilter(filters = {}) {
        const query = {
            where: {},
            limit: this._limit,
            order: [["id", "DESC"]],
        };

        if (filters.name) {
            query.where.name = {
                [Op.like]: `%${filters.name}%`,
            };
        }

        return Topic.findAndCountAll(query);
    }

    /**
     * Find a topic by ID.
     * @param {number} id
     * @returns {Promise<Topic>}
     */
    async findById(id) {
        return Topic.findByPk(id);
    }

    /**
     * Get a topic's posts with pagination.
     * @param {Topic} topic
     * @param {number} [limit]
     * @returns {Promise<Object>}
     */
    async getTopicPostsWithPagination(topic, limit = this._limit) {
        return topic.getPosts({
            limit,
            order: [["id", "DESC"]],
        });
    }

    /**
     * Create a new topic.
     * @param {Object} data
     * @returns {Promise<Topic>}
     */
    async createTopic(data) {
        const topic = await Topic.create(data);
        return topic;
    }

    /**
     * Update a topic's information.
     * @param {Topic} topic
     * @param {Object} data
     * @returns {Promise<Topic>}
     */
    async updateTopic(topic, data) {
        await topic.update(data);
        return topic;
    }

    /**
     * Delete a topic (soft delete).
     * @param {Topic} topic
     * @returns {Promise<boolean>}
     */
    async deleteTopic(topic) {
        return topic.destroy(); // Assuming soft delete is set up in your model
    }

    /**
     * Permanently delete a topic.
     * @param {Topic} topic
     * @returns {Promise<boolean>}
     */
    async permanentDeleteTopic(topic) {
        return topic.destroy({ force: true }); // Permanent delete
    }
}

module.exports = new TopicRepository();
