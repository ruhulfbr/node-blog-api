const { Post, Topic, User } = require("../models");
const { Op } = require("sequelize");

class PostRepository {
    constructor(limit = 10) {
        this._limit = limit;
    }

    /**
     * Get all posts with optional filters and pagination.
     * @param {Object} filters
     * @param {User} user
     * @returns {Promise<Object>}
     */
    async getPostsWithFilter(filters = {}, user) {
        const query = {
            where: {},
            include: [
                {
                    model: Topic,
                    through: { attributes: [] },
                },
            ],
            limit: this._limit,
            order: [["id", "DESC"]],
        };

        if (user && user.isUser()) {
            query.where.status = "published"; // Replace with your status for published posts
        }

        if (filters.title) {
            query.where.title = {
                [Op.like]: `%${filters.title}%`,
            };
        }

        if (filters.content) {
            query.where.content = {
                [Op.like]: `%${filters.content}%`,
            };
        }

        if (filters.topic_id) {
            query.include[0].where = { id: filters.topic_id };
        }

        if (filters.status && user && user.isAdmin()) {
            query.where.status = filters.status; // Ensure status is valid
        }

        return Post.findAndCountAll(query);
    }

    /**
     * Get a post by ID.
     * @param {number} id
     * @returns {Promise<Post>}
     */
    async findById(id) {
        return Post.findByPk(id, {
            include: [
                {
                    model: Topic,
                    through: { attributes: [] },
                },
            ],
        });
    }

    /**
     * Create a new post.
     * @param {Object} data
     * @returns {Promise<Post>}
     */
    async createPost(data) {
        return Post.create(data);
    }

    /**
     * Update a post's information.
     * @param {Post} post
     * @param {Object} data
     * @returns {Promise<Post>}
     */
    async updatePost(post, data) {
        await post.update(data);

        return post;
    }

    /**
     * Attach topics to a post.
     * @param {Post} post
     * @param {number[]} topicIds
     * @returns {Promise<Post>}
     */
    async attachTopics(post, topicIds) {
        await post.addTopics(topicIds);

        return post;
    }

    /**
     * Detach topics from a post.
     * @param {Post} post
     * @param {number[]} topicIds
     * @returns {Promise<Post>}
     */
    async detachTopics(post, topicIds) {
        await post.removeTopics(topicIds);

        return post;
    }

    /**
     * Sync topics for a post.
     * @param {Post} post
     * @param {number[]} topicIds
     * @returns {Promise<Post>}
     */
    async syncTopics(post, topicIds) {
        await post.setTopics(topicIds);

        return post;
    }

    /**
     * Delete a post (soft delete).
     * @param {Post} post
     * @returns {Promise<boolean>}
     */
    async deletePost(post) {
        return post.destroy(); // Soft delete
    }

    /**
     * Permanently delete a post.
     * @param {Post} post
     * @returns {Promise<boolean>}
     */
    async permanentDeletePost(post) {
        return post.destroy({ force: true }); // Permanent delete
    }
}

module.exports = new PostRepository();
