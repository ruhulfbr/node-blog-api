const express = require("express");
const router = express.Router();
const { PostService } = require("../services");
const {
    validatePostRequest,
    validatePostsStatusRequest,
} = require("../middlewares/validationMiddleware");
const JsonApiResponse = require("../utils/JsonApiResponse");

class PostController {
    constructor() {
        this.service = new PostService();
    }

    async index(req, res) {
        try {
            const result = await this.service.getPosts(req.query);
            res.status(result.status).json(JsonApiResponse.handle(result));
        } catch (error) {
            res.status(500).json(JsonApiResponse.error(error.message));
        }
    }

    async store(req, res) {
        try {
            const data = req.body;
            const result = await this.service.createPost(data);
            res.status(result.status).json(JsonApiResponse.handle(result));
        } catch (error) {
            res.status(500).json(JsonApiResponse.error(error.message));
        }
    }

    async show(req, res) {
        try {
            const postId = req.params.id;
            const result = await this.service.getPostById(postId);
            res.status(result.status).json(JsonApiResponse.data(result.data));
        } catch (error) {
            res.status(500).json(JsonApiResponse.error(error.message));
        }
    }

    async update(req, res) {
        try {
            const postId = req.params.id;
            const data = req.body;
            const result = await this.service.updatePost(postId, data);
            res.status(result.status).json(JsonApiResponse.handle(result));
        } catch (error) {
            res.status(500).json(JsonApiResponse.error(error.message));
        }
    }

    async updateStatus(req, res) {
        try {
            const postId = req.params.id;
            const data = req.body;
            const result = await this.service.updatePostStatus(postId, data);
            res.status(result.status).json(JsonApiResponse.handle(result));
        } catch (error) {
            res.status(500).json(JsonApiResponse.error(error.message));
        }
    }

    async destroy(req, res) {
        try {
            const postId = req.params.id;
            const result = await this.service.deletePost(postId);
            res.status(result.status).json(JsonApiResponse.handle(result));
        } catch (error) {
            res.status(500).json(JsonApiResponse.error(error.message));
        }
    }
}

module.exports = new PostController();
