const response = require("../responses/JsonResponse");
const { userService: service } = require("../services");
const { validationResult } = require("express-validator");

/**
 * Get a list of users with optional filters and pagination
 */
const index = async (req, res) => {
    const result = await service.getUsers(req);
    return response.handle(res, result);
};

/**
 * Create a new user
 */
const store = async (req, res) => {
    const data = req.body;
    const result = await service.createUser(data);
    return response.handle(res, result);
};

/**
 * Get a user by ID
 */
const show = async (req, res) => {
    const { userId } = req.params;
    const result = await service.getUserById(userId);
    return response.handle(res, result);
};

/**
 * Update a user's information
 */
const update = async (req, res) => {
    const { userId } = req.params;
    const result = await service.updateUser(userId, req.body);
    return response.handle(res, result);
};

/**
 * Update a user's password
 */
const updatePassword = async (req, res) => {
    const { userId } = req.params;
    const result = await service.updateUserPassword(userId, req.body);
    return response.handle(res, result);
};

/**
 * Update a user's status
 */
const updateStatus = async (req, res) => {
    const { userId } = req.params;
    const result = await service.updateUserStatus(userId, req.body);
    return response.handle(res, result);
};

/**
 * Update a user's role
 */
const updateRole = async (req, res) => {
    const { userId } = req.params;
    const result = await service.updateUserRole(userId, req.body);
    return response.handle(res, result);
};

/**
 * Delete a user (soft delete)
 */
const destroy = async (req, res) => {
    const { userId } = req.params;
    const result = await service.deleteUser(userId);
    return response.handle(res, result);
};

/**
 * Get posts of a user
 */
const posts = async (req, res) => {
    const { userId } = req.params;
    const result = await service.getUserPosts(userId);
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
