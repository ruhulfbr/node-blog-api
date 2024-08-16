const {StatusCodes} = require("http-status-codes");
const bcrypt = require("bcrypt");
const {keepLog} = require("./Logger");
const {UserRepository: repository} = require("../repositories");

const result = require("./ServiceResult");

/**
 * Get users with optional filters and pagination.
 * @param {Object} filters
 * @returns {Promise<ServiceResult>}
 */
const getUsers = async (filters) => {
    try {
        const users = await repository.getUsersWithFilter(filters);
        result.setData(users);
    } catch (error) {
        const message = "Failed to fetch users";
        keepLog("error", message, error);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

/**
 * Fetch a user by its ID.
 * @param {integer} id - The ID of the user to retrieve.
 * @returns {Promise<ServiceResult>}
 */
const getUserById = async (id) => {
    try {
        const user = await repository.findById(id);

        if (user) {
            result.setData(user);
        } else {
            const message = "User not found";
            result.setError(message, StatusCodes.NOT_FOUND);
        }
    } catch (error) {
        const message = "Failed to fetch user";
        keepLog("error", message, error);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

/**
 * Create a new user.
 * @param {Object} data
 * @returns {Promise<ServiceResult>}
 */
const createUser = async (data) => {
    try {
        data.password = await bcrypt.hash(data.password, 11);

        const user = await repository.createUser(data);
        result.setData(user);
    } catch (error) {
        const message = "User creation failed";
        keepLog('error', message, error);
        result.setError(message, 400);
    }

    return result;
};

/**
 * Update a user's information.
 * @param {number} userId
 * @param {Object} data
 * @returns {Promise<ServiceResult>}
 */
const updateUser = async (userId, data) => {
    try {
        const user = await repository.findById(userId);

        if (user) {
            let updatedUser = await repository.updateUser(user, data);
            result.setData(updatedUser);
        } else {
            const message = "User not found";
            result.setError(message, StatusCodes.NOT_FOUND);
        }
    } catch (error) {
        const message = "User update failed";
        keepLog('error', message, error);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

/**
 * Update a user's password.
 * @param {Number} userId
 * @param {Object} data
 * @returns {Promise<ServiceResult>}
 */
const updateUserPassword = async (userId, data) => {
    try {
        const user = await repository.findById(userId);

        if (user) {
            const hashedPassword = await bcrypt.hash(data.password, 11);
            const updatedUser = await repository.updateUser(user, {
                password: hashedPassword,
            });
            result.setData(updatedUser);
        } else {
            const message = "User not found";
            result.setError(message, StatusCodes.NOT_FOUND);
        }
    } catch (error) {
        const message = "User password update failed";
        keepLog('error', message, error);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

/**
 * Update a user's status.
 * @param {Number} userId
 * @param {Object} data
 * @returns {Promise<ServiceResult>}
 */
const updateUserStatus = async (userId, data) => {
    try {
        const user = await repository.findById(userId);

        if (user) {
            const updatedUser = await repository.updateUser(user, {
                status: data.status,
            });
            result.setData(updatedUser);
        } else {
            const message = "User not found";
            result.setError(message, StatusCodes.NOT_FOUND);
        }
    } catch (error) {
        const message = "User status update failed";
        keepLog('error', message, error);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

/**
 * Update a user's role.
 * @param {Number} userId
 * @param {Object} data
 * @returns {Promise<ServiceResult>}
 */
const updateUserRole = async (userId, data) => {
    try {
        const user = await repository.findById(userId);

        if (user) {
            const updatedUser = await repository.updateUser(user, {
                role: data.role,
            });
            result.setData(updatedUser);
        } else {
            const message = "User not found";
            result.setError(message, StatusCodes.NOT_FOUND);
        }
    } catch (error) {
        const message = "User role update failed";
        keepLog('error', message, error);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

/**
 * Soft delete a user.
 * @param {Number} userId
 * @returns {Promise<ServiceResult>}
 */
const deleteUser = async (userId) => {
    try {
        const user = await repository.findById(userId);

        if (user) {
            await repository.deleteUser(user);
            result.setDeleted();
        } else {
            const message = "User not found";
            result.setError(message, StatusCodes.NOT_FOUND);
        }
    } catch (error) {
        const message = "User deletion failed";
        keepLog("error", message, error);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

/**
 * Permanently delete a user.
 * @param {Number} userId
 * @returns {Promise<ServiceResult>}
 */
const forceDelete = async (userId) => {
    try {
        const user = await repository.findById(userId);

        if (user) {
            await repository.permanentDeleteUser(user);
            result.setDeleted();
        } else {
            const message = "User not found";
            result.setError(message, StatusCodes.NOT_FOUND);
        }
    } catch (error) {
        const message = "User deletion failed";
        keepLog("error", message, error);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

/**
 * Get a user's posts.
 * @param {Number} userId
 * @returns {Promise<ServiceResult>}
 */
const getUserPosts = async (userId) => {
    try {
        const user = await repository.findById(userId);

        if (user) {
            const posts = await repository.userPostsWithPagination(user, 10);
            result.setData(posts);
        } else {
            const message = "User not found";
            result.setError(message, StatusCodes.NOT_FOUND);
        }
    } catch (error) {
        const message = "User's post fetching failed";
        keepLog("error", message, error);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    updateUserPassword,
    updateUserStatus,
    updateUserRole,
    deleteUser,
    forceDelete,
    getUserPosts,
};
