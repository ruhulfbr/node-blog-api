const { StatusCodes } = require("http-status-codes");
const { TopicRepository: repository } = require("../repositories");
const { keepLog } = require("./Logger");
const ServiceResult = require("./ServiceResult");

const result = new ServiceResult();

/**
 * Fetch topics with optional filters.
 * @param {Object} filters
 * @returns {Promise<Result>}
 */
const getTopics = async (filters) => {
    try {
        const topics = await repository.getTopicsWithFilter(filters);
        result.setData(topics);
    } catch (exception) {
        const message = "Failed to fetch topics";
        keepLog("error", message, exception.message);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

/**
 * Fetch a topic by its ID.
 * @param {number} id - The ID of the topic to retrieve.
 * @returns {Promise<Result>}
 */
const getTopicById = async (id) => {
    try {
        const topic = await repository.findById(id);

        if (topic) {
            result.setData(topic);

            return result;
        }

        const message = "Topic not found";

        keepLog("error", message);
        result.setError(message, StatusCodes.NOT_FOUND);
    } catch (exception) {
        const message = "Failed to fetch topic";

        keepLog("error", message, exception);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

/**
 * Create a new topic.
 * @param {Object} data
 * @returns {Promise<Result>}
 */
const createTopic = async (data) => {
    try {
        const topic = await repository.createTopic(data);
        result.setData(topic);
    } catch (exception) {
        const message = "Topic creation failed";
        keepLog("error", message, exception.message);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

/**
 * Update a topic's information.
 * @param {int} topicId
 * @param {Object} data
 * @returns {Promise<Result>}
 */
const updateTopic = async (topicId, data) => {
    try {
        const topic = await repository.findById(topicId);

        if (!topic) {
            const message = "Topic not found";
            keepLog("error", message);
            result.setError(message, StatusCodes.NOT_FOUND);
        } else {
            const updatedTopic = await repository.updateTopic(topic, data);
            result.setData(updatedTopic);
        }
    } catch (exception) {
        const message = "Topic update failed";
        keepLog("error", message, exception.message);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

/**
 * Soft delete a topic.
 * @param {integer} topicId
 * @returns {Promise<Result>}
 */
const deleteTopic = async (topicId) => {
    try {
        const topic = await repository.findById(topicId);

        if (!topic) {
            const message = "Topic not found";
            keepLog("error", message);
            result.setError(message, StatusCodes.NOT_FOUND);
        } else {
            await repository.deleteTopic(topic);
            result.setDeleted();
        }
    } catch (exception) {
        const message = "Topic deletion failed";
        keepLog("error", message, exception.message);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

/**
 * Permanently delete a topic.
 * @param {integer} topicId
 * @returns {Promise<Result>}
 */
const permanentDeleteTopic = async (topicId) => {
    try {
        const topic = await repository.findById(topicId);

        if (!topic) {
            const message = "Topic not found";
            keepLog("error", message);
            result.setError(message, StatusCodes.NOT_FOUND);
        } else {
            await repository.permanentDeleteTopic(topicId);
            result.setDeleted();
        }
    } catch (exception) {
        const message = "Topic deletion failed";
        keepLog("error", message, exception.message);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

/**
 * Get posts for a topic with pagination.
 * @param {Topic} topic
 * @param {number} [limit=10]
 * @returns {Promise<Result>}
 */
const getTopicPosts = async (topic, limit = 10) => {
    try {
        const posts = await repository.getTopicPostsWithPagination(
            topic,
            limit
        );
        result.setData(posts);
    } catch (exception) {
        const message = "Failed to fetch topic's posts";
        keepLog("error", message, exception.message);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

module.exports = {
    getTopics,
    getTopicById,
    createTopic,
    updateTopic,
    deleteTopic,
    permanentDeleteTopic,
    getTopicPosts,
};
