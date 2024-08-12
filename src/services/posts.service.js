const { Category, BlogPost, User, PostCategory } = require("../models");
const schema = require("./validators/validadeInputsValues");
const decodeToken = require("../utils/decodeToken");

const getAll = async () => {
    const posts = await BlogPost.findAll({
        include: [
            {
                model: User,
                as: "user",
                attributes: ["id", "displayName", "email", "image"],
            },
            {
                model: Category,
                as: "categories",
                attributes: ["id", "name"],
                through: { attributes: [] },
            },
        ],
    });

    return { type: null, message: posts };
};

const getById = async (id) => {
    const post = await BlogPost.findByPk(id, {
        attributes: { exclude: ["user_id"] },
        include: [
            {
                model: User,
                as: "user",
                attributes: ["id", "displayName", "email", "image"],
            },
            {
                model: Category,
                as: "categories",
                attributes: ["id", "name"],
                through: { attributes: [] },
            },
        ],
    });

    if (!post) {
        return { type: "NOT_FOUND", message: "Post does not exist" };
    }

    return { type: null, message: post };
};

const update = async (body, id) => {
    const error = schema.validadeUpdatePost(body);

    if (error.type) {
        return error;
    }

    const { title, content } = body;

    const post = await BlogPost.findByPk(id);

    await post.update({ title, content });

    await post.save();

    const { message } = await getById(id);

    return { type: null, message };
};

const create = async (body, token) => {
    const error = schema.validadePost(body);

    if (error.type) {
        return error;
    }

    const { title, content, categoryIds } = body;

    const userId = decodeToken(token).id;

    const newPost = await BlogPost.create({ title, content, userId });

    categoryIds.forEach((category) =>
        PostCategory.create({
            postId: newPost.dataValues.id,
            categoryId: category,
        })
    );

    return { type: null, message: newPost.dataValues };
};

const remove = async (id, token) => {
    const post = await BlogPost.findByPk(id);

    if (!post) {
        return { type: "NOT_FOUND", message: "Post does not exist" };
    }

    const userId = decodeToken(token).id;

    if (userId !== post.dataValues.userId) {
        return { type: "UNAUTHORIZED", message: "Unauthorized user" };
    }

    await post.destroy({ where: { id } });

    return { type: null, message: null };
};

module.exports = {
    getAll,
    getById,
    update,
    create,
    remove,
};
