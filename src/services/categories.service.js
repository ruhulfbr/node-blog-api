const { Category } = require("../models");
const schema = require("./validators/validadeInputsValues");

const create = async (name) => {
    const error = schema.validadeProductName(name);

    if (error.type) {
        return error;
    }

    const insertId = await Category.create({ name });

    return { type: null, message: { id: insertId, name } };
};

const getAll = async () => {
    const categories = await Category.findAll();

    return { type: null, message: categories };
};

module.exports = {
    create,
    getAll,
};
