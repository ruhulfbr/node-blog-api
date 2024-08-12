const { User } = require("../models");
const schema = require("./validators/validadeInputsValues");
const generateToken = require("../utils/generateToken");
const decodeToken = require("../utils/decodeToken");

const create = async (body) => {
    const error = schema.validadeUser(body);

    if (error.type) {
        return error;
    }

    const { displayName, email, password, image } = body;

    const user = await User.findOne({ where: { email } });

    if (user) {
        return { type: "ALREADY_EXISTS", message: "User already registered" };
    }

    const newUser = await User.create({ displayName, email, password, image });

    const payload = {
        displayName: newUser.displayName,
        email: newUser.email,
        id: newUser.id,
    };

    const token = generateToken(payload);

    return { type: null, token };
};

const getByEmail = async (body) => {
    const error = schema.validateLogin(body);

    if (error.type) {
        return error;
    }

    const { email } = body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return { type: "INVALIDE_FIELD", message: "Invalid fields" };
    }

    const payload = {
        displayName: user.displayName,
        email: user.email,
        id: user.id,
    };

    const token = generateToken(payload);

    return { type: null, token };
};

const getAll = async () => {
    const users = await User.findAll({
        attributes: { exclude: ["password"] },
    });

    return { type: "", message: users };
};

const getById = async (id) => {
    const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
    });

    if (!user) {
        return { type: "NOT_FOUND", message: "User does not exist" };
    }

    return { type: "", message: user };
};

const remove = async (token) => {
    const { id } = decodeToken(token);
    await User.destroy({ where: { id } });

    return { type: null, message: null };
};

module.exports = {
    create,
    getByEmail,
    getAll,
    getById,
    remove,
};
