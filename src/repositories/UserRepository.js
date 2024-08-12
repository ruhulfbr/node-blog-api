const { User, Post, Topic } = require("../models");
const { Op } = require("sequelize");

class UserRepository {
    constructor(limit = 10) {
        this._limit = limit;
    }

    /**
     * Get all users with optional filters and pagination.
     * @param {Object} filters
     * @returns {Promise<Object>}
     */
    async getUsersWithFilter(filters = {}) {
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

        if (filters.email) {
            query.where.email = filters.email;
        }

        if (filters.status) {
            query.where.status = filters.status; // Ensure status is valid in your app
        }

        return User.findAndCountAll(query);
    }

    /**
     * Get a user by ID.
     * @param {number} id
     * @returns {Promise<User>}
     */
    async findById(id) {
        return User.findByPk(id);
    }

    /**
     * Get a user's posts with pagination.
     * @param {User} user
     * @param {number} [limit]
     * @returns {Promise<Object>}
     */
    async userPostsWithPagination(user, limit = this._limit) {
        return user.getPosts({
            limit,
            order: [["id", "DESC"]],
        });
    }

    /**
     * Create a new user.
     * @param {Object} data
     * @returns {Promise<User>}
     */
    async createUser(data) {
        const user = await User.create(data);
        return user;
    }

    /**
     * Update a user's information.
     * @param {User} user
     * @param {Object} data
     * @returns {Promise<User>}
     */
    async updateUser(user, data) {
        await user.update(data);
        return user;
    }

    /**
     * Attach topics to a user.
     * @param {User} user
     * @param {number[]} topicIds
     * @returns {Promise<User>}
     */
    async attachTopics(user, topicIds) {
        await user.addTopics(topicIds);
        return user;
    }

    /**
     * Detach topics from a user.
     * @param {User} user
     * @param {number[]} topicIds
     * @returns {Promise<User>}
     */
    async detachTopics(user, topicIds) {
        await user.removeTopics(topicIds);
        return user;
    }

    /**
     * Sync topics for a user.
     * @param {User} user
     * @param {number[]} topicIds
     * @returns {Promise<User>}
     */
    async syncTopics(user, topicIds) {
        await user.setTopics(topicIds);
        return user;
    }

    /**
     * Delete a user (soft delete).
     * @param {User} user
     * @returns {Promise<boolean>}
     */
    async deleteUser(user) {
        return user.destroy(); // Assuming soft delete is set up in your model
    }

    /**
     * Permanently delete a user.
     * @param {User} user
     * @returns {Promise<boolean>}
     */
    async permanentDeleteUser(user) {
        return user.destroy({ force: true }); // Permanent delete
    }
}

module.exports = new UserRepository();
