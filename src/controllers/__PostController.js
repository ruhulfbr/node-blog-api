const { postService } = require("../services");
const { mapError } = require("../utils/errorMap");

const getAll = async (req, res) => {
    const { type, message } = await postService.getAll();

    if (type) {
        return res.status(mapError(type)).json({ message });
    }

    res.status(200).json(message);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await postService.getById(id);

    if (type) {
        return res.status(mapError(type)).json({ message });
    }

    res.status(200).json(message);
};

const update = async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const token = req.headers.authorization;

    const { type, message } = await postService.update(body, id, token);

    if (type) {
        return res.status(mapError(type)).json({ message });
    }

    res.status(200).json(message);
};

const create = async (req, res) => {
    const { body } = req;
    const token = req.headers.authorization;

    const { type, message } = await postService.create(body, token);

    if (type) {
        return res.status(mapError(type)).json({ message });
    }

    res.status(201).json(message);
};

const remove = async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization;

    const { type, message } = await postService.remove(id, token);

    if (type) {
        return res.status(mapError(type)).json({ message });
    }

    res.status(204).json(message);
};

module.exports = {
    getAll,
    getById,
    update,
    create,
    remove,
};
