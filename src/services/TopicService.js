const {StatusCodes} = require("http-status-codes");
const {TopicRepository: repository} = require("../repositories");
const {keepLog} = require("./Logger");
const result = require("./ServiceResult");

/**
 * Fetch topics with optional filters.
 * @param {Object} filters
 * @returns {Promise<ServiceResult>}
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
 * @param {Number} id - The ID of the topic to retrieve.
 * @returns {Promise<ServiceResult>}
 */
const getTopicById = async (id) => {
    try {
        const topic = await repository.findById(id);

        if (topic) {
            result.setData(topic);
        } else {
            const message = "Topic not found";

            keepLog("error", message);
            result.setError(message, StatusCodes.NOT_FOUND);
        }
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
 * @returns {Promise<ServiceResult>}
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
 * @param {Number} topicId
 * @param {Object} data
 * @returns {Promise<ServiceResult>}
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
 * @param {Number} topicId
 * @returns {Promise<ServiceResult>}
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
 * @param {Number} topicId
 * @returns {Promise<ServiceResult>}
 */
const forceDelete = async (topicId) => {
    try {
        const topic = await repository.findById(topicId);

        if (topic) {
            await repository.permanentDeleteTopic(topicId);
            result.setDeleted();
        } else {
            const message = "Topic not found";
            keepLog("error", message);
            result.setError(message, StatusCodes.NOT_FOUND);
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
 * @param {number} topicId
 * @param {number} [limit=10]
 * @returns {Promise<ServiceResult>}
 */
const getTopicPosts = async (topicId, limit = 10) => {
    try {
        const topic = await repository.findById(topicId);

        if (topic) {
            const posts = await repository.getTopicPostsWithPagination(
                topic,
                limit
            );
            result.setData(posts);
        } else {
            const message = "Topic not found";
            keepLog("error", message);
            result.setError(message, StatusCodes.NOT_FOUND);
        }
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
    forceDelete,
    getTopicPosts,
};
