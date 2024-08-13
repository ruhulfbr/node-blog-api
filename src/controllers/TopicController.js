const { topicService } = require("../services");
const { mapError } = require("../utils/errorMap");
const { Topic } = require("../models");
const response = require("../responses/JsonResponse");

/**
 * Handle GET /topics
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
const index = async (req, res) => {
    const result = await topicService.getTopics(req.query);

    return response.handle(res, result);
};

/**
 * Handle GET /topics/:topicId
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
const show = async (req, res) => {
    const { topicId } = req.params;
    const result = await topicService.getTopicById(topicId);

    return response.handle(res, result);
};

/**
 * Handle POST /topics
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
const store = async (req, res) => {
    const result = await topicService.createTopic(req.body);

    return response.handle(res, result);
};

/**
 * Handle GET /topics/:topicId/posts
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
const posts = async (req, res) => {
    const { topicId } = req.params;

    try {
        const topic = await Topic.findByPk(topicId);
        if (!topic) {
            return res.status(404).json({ message: "Topic not found" });
        }
        const { type, message } = await topicService.getTopicPosts(topic);
        if (type) {
            return res.status(mapError(type)).json({ message });
        }
        return res.status(200).json(message);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Failed to fetch topic's posts" });
    }
};

/**
 * Handle PUT /topics/:topicId
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
const update = async (req, res) => {
    const { topicId } = req.params;
    const result = await topicService.updateTopic(topicId, req.body);

    return response.handle(res, result);
};

/**
 * Handle DELETE /topics/:topicId
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
const destroy = async (req, res) => {
    const { topicId } = req.params;
    try {
        const topic = await Topic.findByPk(topicId);
        if (!topic) {
            return res.status(404).json({ message: "Topic not found" });
        }
        const { type, message } = await topicService.deleteTopic(topic);
        if (type) {
            return res.status(mapError(type)).json({ message });
        }
        return res.status(204).end(); // No Content
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete topic" });
    }
};

module.exports = {
    index,
    show,
    store,
    posts,
    update,
    destroy,
};
