const response = require("../responses/JsonResponse");
const {userService} = require("../services");

/**
 * Get a list of users with optional filters and pagination
 */
const index = async (req, res) => {
    const result = await userService.getUsers(req);

    return response.handle(res, result);
};

/**
 * Create a new user
 */
const store = async (req, res) => {
    const data = req.body;
    const result = await userService.createUser(data);

    return response.handle(res, result);
};

/**
 * Get a user by ID
 */
const show = async (req, res) => {
    const {userId} = req.params;
    const result = await userService.getUserById(userId);

    return response.handle(res, result);
};

/**
 * Update a user's information
 */
const update = async (req, res) => {
    const {userId} = req.params;
    const result = await userService.updateUser(userId, req.body);

    return response.handle(res, result);
};

/**
 * Update a user's password
 */
const updatePassword = async (req, res) => {
    const {userId} = req.params;
    const result = await userService.updateUserPassword(userId, req.body);

    return response.handle(res, result);
};

/**
 * Update a user's status
 */
const updateStatus = async (req, res) => {
    const {userId} = req.params;
    const result = await userService.updateUserStatus(userId, req.body);

    return response.handle(res, result);
};

/**
 * Update a user's role
 */
const updateRole = async (req, res) => {
    const {userId} = req.params;
    const result = await userService.updateUserRole(userId, req.body);

    return response.handle(res, result);
};

/**
 * Delete a user (soft delete)
 */
const destroy = async (req, res) => {
    const {userId} = req.params;
    const result = await userService.deleteUser(userId);

    return response.handle(res, result);
};

/**
 * Get posts of a user
 */
const posts = async (req, res) => {
    const {userId} = req.params;
    const result = await userService.getUserPosts(userId);

    return response.handle(res, result);
};

module.exports = {
    index,
    store,
    show,
    posts,
    update,
    updatePassword,
    updateStatus,
    updateRole,
    destroy,
};
