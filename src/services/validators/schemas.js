const Joi = require("joi");

const userSchema = Joi.object({
    displayName: Joi.string().required().min(8).label("displayName"),
    email: Joi.string().email().required().label("email"),
    password: Joi.string().required().min(6).label("password"),
    image: Joi.string().label("image"),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().label("email"),
    password: Joi.string().required().min(6).label("password"),
});

const productNameSchema = Joi.string().required().label("name");

const postSchema = Joi.object({
    title: Joi.string().required().label("title"),
    content: Joi.string().required().label("content"),
    categoryIds: Joi.array().items(Joi.number().integer()).label("categoryIds"),
});

const postUpdateSchema = Joi.object({
    title: Joi.string().required().label("title"),
    content: Joi.string().required().label("content"),
});

module.exports = {
    userSchema,
    loginSchema,
    productNameSchema,
    postSchema,
    postUpdateSchema,
};
