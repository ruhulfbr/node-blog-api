const {topicService} = require("../services");
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
    const {topicId} = req.params;
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
    const {topicId} = req.params;
    const result = await topicService.getTopicPosts(topicId);

    return response.handle(res, result);
};

/**
 * Handle PUT /topics/:topicId
 */
const update = async (req, res) => {
    const {topicId} = req.params;
    const result = await topicService.updateTopic(topicId, req.body);

    return response.handle(res, result);
};

/**
 * Handle DELETE /topics/:topicId
 */
const destroy = async (req, res) => {
    const {topicId} = req.params;
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
