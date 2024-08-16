const {UserStatus} = require("../enums");
const {User, Post, Topic} = require("../models");
const {Op} = require("sequelize");

const DEFAULT_LIMIT = 10;

/**
 * Get all users with optional filters and pagination.
 * @param {Object} filters
 * @param {number} limit
 * @returns {Promise<Object>}
 */
const getUsersWithFilter = async (filters = {}, limit = DEFAULT_LIMIT) => {
    const query = {
        where: {},
        limit: limit,
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

    if (filters.status && UserStatus.getLabel(filters.status)) {
        query.where.status = filters.status;
    }

    return User.findAndCountAll(query);
};

/**
 * Get a user by ID.
 * @param {number} id
 * @returns {Promise<User>}
 */
const findById = async (id) => User.findByPk(id);

/**
 * Find a user by email.
 * @param {string} email
 * @returns {Promise<Topic>}
 */
const findUserByEmail = async (email) => {
    return User.findOne({
        where: {email: email},
    });
};

/**
 * Get a user's posts with pagination.
 * @param {User} user
 * @param {number} [limit]
 * @returns {Promise<Object>}
 */
const userPostsWithPagination = async (user, limit = DEFAULT_LIMIT) => {
    return user.getPosts({
        limit,
        order: [["id", "DESC"]],
    });
};

/**
 * Create a new user.
 * @param {Object} data
 * @returns {Promise<User>}
 */
const createUser = async (data) => User.create(data);

/**
 * Update a user's information.
 * @param {User} user
 * @param {Object} data
 * @returns {Promise<User>}
 */
const updateUser = async (user, data) => {
    await user.update(data);
    return user;
};

/**
 * Attach topics to a user.
 * @param {User} user
 * @param {number[]} topicIds
 * @returns {Promise<User>}
 */
const attachTopics = async (user, topicIds) => {
    await user.addTopics(topicIds);
    return user;
};

/**
 * Detach topics from a user.
 * @param {User} user
 * @param {number[]} topicIds
 * @returns {Promise<User>}
 */
const detachTopics = async (user, topicIds) => {
    await user.removeTopics(topicIds);
    return user;
};

/**
 * Sync topics for a user.
 * @param {User} user
 * @param {number[]} topicIds
 * @returns {Promise<User>}
 */
const syncTopics = async (user, topicIds) => {
    await user.setTopics(topicIds);
    return user;
};

/**
 * Delete a user (soft delete).
 * @param {User} user
 * @returns {Promise<void>}
 */
const deleteUser = async (user) => user.destroy();

/**
 * Permanently delete a user.
 * @param {User} user
 * @returns {Promise<void>}
 */
const permanentDeleteUser = async (user) => user.destroy({force: true});

module.exports = {
    getUsersWithFilter,
    findById,
    findUserByEmail,
    userPostsWithPagination,
    createUser,
    updateUser,
    attachTopics,
    detachTopics,
    syncTopics,
    deleteUser,
    permanentDeleteUser,
};
