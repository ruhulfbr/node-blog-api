const { userService } = require("../services");
const { mapError } = require("../utils/errorMap");

const create = async (req, res) => {
    const { body } = req;

    const { type, token, message } = await userService.create(body);

    if (type) {
        return res.status(mapError(type)).json({ message });
    }

    res.status(201).json({ token });
};

const login = async (req, res) => {
    const { body } = req;

    const { type, token, message } = await userService.getByEmail(body);

    if (type) {
        return res.status(mapError(type)).json({ message });
    }

    res.status(200).json({ token });
};

const getAll = async (_req, res) => {
    const { type, message } = await userService.getAll();

    if (type) {
        return res.status(mapError(type)).json({ message });
    }

    res.status(200).json(message);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await userService.getById(id);

    if (type) {
        return res.status(mapError(type)).json({ message });
    }

    res.status(200).json(message);
};

const remove = async (req, res) => {
    const token = req.headers.authorization;

    const { type, message } = await userService.remove(token);

    if (type) {
        return res.status(mapError(type)).json({ message });
    }

    res.status(204).json(message);
};

module.exports = {
    create,
    login,
    getAll,
    getById,
    remove,
};
