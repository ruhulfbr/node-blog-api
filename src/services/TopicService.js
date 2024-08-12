const HttpStatus = require("http-status-codes");
const Service = require("./Service");
const { TopicRepository } = require("./../repositories");

class TopicService extends Service {
    constructor() {
        super();

        this.repository = new TopicRepository();
    }

    async getTopics(filters) {
        try {
            const topics = await this.repository.getTopicsWithFilter(filters);
            this.result.setData(topics);
        } catch (exception) {
            const message = "Failed to fetch topics";

            this.keepLog("error", message, exception.message);
            this.result.setError(message, HttpStatus.BAD_REQUEST);
        }

        return this.result;
    }

    async createTopic(data) {
        try {
            const topic = await this.repository.createTopic(data);
            this.result.setData(topic);
        } catch (exception) {
            const message = "Topic creation failed";
            this.keepLog("error", message, exception.message);
            this.result.setError(message, HttpStatus.BAD_REQUEST);
        }

        return this.result;
    }

    async updateTopic(topic, data) {
        try {
            const updatedTopic = await this.repository.updateTopic(topic, data);
            this.result.setData(updatedTopic);
        } catch (exception) {
            const message = "Topic update failed";
            this.keepLog("error", message, exception.message);
            this.result.setError(message, HttpStatus.BAD_REQUEST);
        }

        return this.result;
    }

    async deleteTopic(topic) {
        try {
            await this.repository.deleteTopic(topic);
            this.result.setDeleted();
        } catch (exception) {
            const message = "Topic deletion failed";
            this.keepLog("error", message, exception.message);
            this.result.setError(message, HttpStatus.BAD_REQUEST);
        }

        return this.result;
    }

    async permanentDeleteTopic(topic) {
        try {
            await this.repository.permanentDeleteTopic(topic);
            this.result.setDeleted();
        } catch (exception) {
            const message = "Permanent topic deletion failed";
            this.keepLog("error", message, exception.message);
            this.result.setError(message, HttpStatus.BAD_REQUEST);
        }

        return this.result;
    }

    async getTopicPosts(topic) {
        try {
            const posts = await this.repository.getTopicPostsWithPagination(
                topic,
                10
            );
            this.result.setData(posts);
        } catch (exception) {
            const message = "Failed to fetch topic's posts";
            this.keepLog("error", message, exception.message);
            this.result.setError(message, HttpStatus.BAD_REQUEST);
        }

        return this.result;
    }
}

module.exports = TopicService;
