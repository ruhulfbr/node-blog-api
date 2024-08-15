const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const { UserRepository: repository } = require("../repositories");

const ServiceResult = require("./ServiceResult");

const result = new ServiceResult();

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
        console.error(message, error);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

/**
 * Fetch a user by its ID.
 * @param {integer} id - The ID of the user to retrieve.
 * @returns {Promise<Result>}
 */
const getUserById = async (id) => {
    try {
        const user = await repository.findById(id);

        if (user) {
            result.setData(user);
        } else {
            const message = "User not found";

            keepLog("error", message);
            result.setError(message, StatusCodes.NOT_FOUND);
        }
    } catch (exception) {
        const message = "Failed to fetch user";

        keepLog("error", message, exception);
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
        console.error(message, error);
        result.setError(message, 400);
    }

    return result;
};

/**
 * Update a user's information.
 * @param {integer} userId
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

            keepLog("error", message);
            result.setError(message, StatusCodes.NOT_FOUND);
        }
    } catch (error) {
        const message = "User update failed";

        console.error(message, error);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

/**
 * Update a user's password.
 * @param {Integer} userId
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

            keepLog("error", message);
            result.setError(message, StatusCodes.NOT_FOUND);
        }
    } catch (error) {
        const message = "User password update failed";

        console.error(message, error);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

/**
 * Update a user's status.
 * @param {Integer} userId
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

            keepLog("error", message);
            result.setError(message, StatusCodes.NOT_FOUND);
        }
    } catch (error) {
        const message = "User status update failed";
        console.error(message, error);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

/**
 * Update a user's role.
 * @param {Integer} userId
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

            keepLog("error", message);
            result.setError(message, StatusCodes.NOT_FOUND);
        }
    } catch (error) {
        const message = "User role update failed";
        console.error(message, error);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

/**
 * Soft delete a user.
 * @param {Integer} userId
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

            keepLog("error", message);
            result.setError(message, StatusCodes.NOT_FOUND);
        }
    } catch (error) {
        const message = "User deletion failed";

        console.error(message, error);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

/**
 * Permanently delete a user.
 * @param {Integer} userId
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

            keepLog("error", message);
            result.setError(message, StatusCodes.NOT_FOUND);
        }
    } catch (error) {
        const message = "User deletion failed";

        console.error(message, error);
        result.setError(message, StatusCodes.BAD_REQUEST);
    }

    return result;
};

/**
 * Get a user's posts.
 * @param {Integer} userId
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

            keepLog("error", message);
            result.setError(message, StatusCodes.NOT_FOUND);
        }
    } catch (error) {
        const message = "User's post fetching failed";
        console.error(message, error);
        result.setError(message, 400);
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
