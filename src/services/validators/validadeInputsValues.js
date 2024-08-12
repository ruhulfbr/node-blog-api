const {
    userSchema,
    loginSchema,
    productNameSchema,
    postSchema,
    postUpdateSchema,
} = require("./schemas");

const validadeUser = (body) => {
    const { error } = userSchema.validate(body);
    if (error) {
        return {
            type: "REQUIRED_FIELD",
            message: error.message,
        };
    }
    return { type: null, message: "" };
};

const validateLogin = (body) => {
    const { error } = loginSchema.validate(body);
    if (error) {
        return {
            type: "REQUIRED_FIELD",
            message: "Some required fields are missing",
        };
    }
    return { type: null, message: "" };
};

const validadeProductName = (name) => {
    const { error } = productNameSchema.validate(name);

    if (error) {
        return {
            type: "REQUIRED_FIELD",
            message: error.message,
        };
    }
    return { type: null, message: "" };
};

const validadePost = (body) => {
    const { error } = postSchema.validate(body);
    if (error) {
        return {
            type: "REQUIRED_FIELD",
            message: "Some required fields are missing",
        };
    }
    return { type: null, message: "" };
};

const validadeUpdatePost = (body) => {
    const { error } = postUpdateSchema.validate(body);
    if (error) {
        return {
            type: "REQUIRED_FIELD",
            message: "Some required fields are missing",
        };
    }

    return { type: null, message: "" };
};

module.exports = {
    validadeUser,
    validateLogin,
    validadeProductName,
    validadePost,
    validadeUpdatePost,
};
