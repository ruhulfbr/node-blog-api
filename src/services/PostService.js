const HttpStatus = require("http-status-codes");
const Service = require("./Service");
const { PostRepository } = require("./../repositories");
const { PostStatus } = require("./../enums");

class PostService extends Service {
    constructor() {
        super();
        this.repository = new PostRepository();
    }

    async getPosts(filters) {
        try {
            const posts = await this.repository.getPostsWithFilter(filters);
            this.result.setData(posts);
        } catch (exception) {
            const message = "Failed to fetch posts";
            this.keepLog("error", message, exception.message);
            this.result.setError(message, HttpStatus.BAD_REQUEST);
        }
        return this.result;
    }

    async createPost(data) {
        // Here need transaction {Please serach On Sequalize}

        try {
            data.slug = this.slugify(data.title);
            data.user_id = this.getCurrentUserId(); // logged in user id

            const post = await this.repository.createPost(data, transaction);

            if (data.topics && data.topics.length > 0) {
                const topicIds = data.topics.map((topic) => topic.id);
                await this.repository.attachTopics(post, topicIds, transaction);
            }

            this.result.setData(post);
        } catch (exception) {
            const message = "Post creation failed";
            this.keepLog("error", message, exception.message);
            this.result.setError(message, HttpStatus.BAD_REQUEST);
        }

        return this.result;
    }

    async updatePost(post, data) {
        // Here need transaction {Please serach On Sequalize}

        try {
            data.slug = this.slugify(data.title);

            const updatedPost = await this.repository.updatePost(post, data);

            if (data.topics && data.topics.length > 0) {
                const topicIds = data.topics.map((topic) => topic.id);
                await this.repository.syncTopics(updatedPost, topicIds);
            }

            this.result.setData(updatedPost);
        } catch (exception) {
            const message = "Post update failed";
            this.keepLog("error", message, exception.message);
            this.result.setError(message, HttpStatus.BAD_REQUEST);
        }

        return this.result;
    }

    async updatePostStatus(post, data) {
        try {
            data.status = PostStatus?.getLabel(data.status);
            if (data.status === PostStatus.PUBLISHED) {
                data.approved_by = this.getCurrentUserId();
                data.approved_at = new Date();
            }

            const updatedPost = await this.repository.updatePost(post, data);
            this.result.setData(updatedPost);
        } catch (exception) {
            const message = "Post status update failed";
            this.keepLog("error", message, exception.message);
            this.result.setError(message, HttpStatus.BAD_REQUEST);
        }

        return this.result;
    }

    async deletePost(post) {
        try {
            await this.repository.deletePost(post);
            this.result.setDeleted();
        } catch (exception) {
            const message = "Post deletion failed";
            this.keepLog("error", message, exception.message);
            this.result.setError(message, HttpStatus.BAD_REQUEST);
        }

        return this.result;
    }

    async permanentDeletePost(post) {
        try {
            await this.repository.permanentDeletePost(post);
            this.result.setDeleted();
        } catch (exception) {
            const message = "Permanent post deletion failed";
            this.keepLog("error", message, exception.message);
            this.result.setError(message, HttpStatus.BAD_REQUEST);
        }

        return this.result;
    }

    slugify(title) {
        return title
            .toString() // Convert to string
            .toLowerCase() // Convert to lowercase
            .trim() // Remove whitespace from both ends
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .replace(/[^\w\-]+/g, "") // Remove all non-word characters (excluding hyphens)
            .replace(/\-\-+/g, "-") // Replace multiple hyphens with a single hyphen
            .replace(/^-+/, "") // Remove leading hyphens
            .replace(/-+$/, ""); // Remove trailing hyphens
    }
}

module.exports = PostService;
