const { categoryService } = require("../services");
const { mapError } = require("../utils/errorMap");

const create = async (req, res) => {
    const { name } = req.body;

    const { type, message } = await categoryService.create(name);

    if (type) {
        return res.status(mapError(type)).json({ message });
    }

    res.status(201).json(message);
};

const getAll = async (_req, res) => {
    const { type, message } = await categoryService.getAll();

    if (type) {
        return res.status(mapError(type)).json({ message });
    }

    res.status(200).json(message);
};

module.exports = {
    create,
    getAll,
};
