const { topicService } = require("../services");
const { mapError } = require("../utils/errorMap");
const { Topic } = require("../models");
const response = require("../responses/JsonResponse");

/**
 * Handle GET /topics
 */
const index = async (req, res) => {
    const result = await topicService.getTopics(req.query);

    return response.handle(res, result);
};

/**
 * Handle GET /topics/:topicId
 */
const show = async (req, res) => {
    const { topicId } = req.params;
    const result = await topicService.getTopicById(topicId);

    return response.handle(res, result);
};

/**
 * Handle POST /topics
 */
const store = async (req, res) => {
    const result = await topicService.createTopic(req.body);

    return response.handle(res, result);
};

/**
 * Handle GET /topics/:topicId/posts
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
 */
const update = async (req, res) => {
    const { topicId } = req.params;
    const result = await topicService.updateTopic(topicId, req.body);

    return response.handle(res, result);
};

/**
 * Handle DELETE /topics/:topicId
 */
const destroy = async (req, res) => {
    const { topicId } = req.params;
    const result = await topicService.deleteTopic(topicId);

    return response.handle(res, result);
};

module.exports = {
    index,
    show,
    store,
    posts,
    update,
    destroy,
};
