const {body} = require("express-validator");
const {UserStatus, UserRole} = require("../../enums");
const {UserRepository: repository} = require("../../repositories");

// Define validation rules for creating a user
const createUser = [
    body("name")
        .trim()
        .not()
        .notEmpty()
        .withMessage("The name field is required")
        .isString()
        .isLength({max: 255})
        .withMessage("The name field can have a maximum length of 255 characters"),

    body("email")
        .trim()
        .not()
        .notEmpty()
        .withMessage("The email field is required")
        .isString()
        .isEmail()
        .withMessage("The email field must be a valid email address")
        .isLength({max: 255})
        .withMessage("The email field can have a maximum length of 255 characters")
        .custom(async (value) => {
            const existingUser = await repository.findUserByEmail(value);
            if (existingUser) {
                throw new Error("Email must be unique");
            }
        }),

    body("password")
        .not()
        .notEmpty()
        .withMessage("The password field is required")
        .isLength({min: 8})
        .withMessage("The password field can have a minimum length of 8")
        .custom((value, {req}) => {
            if (value !== req.body.confirm_password) {
                throw new Error("Passwords do not match");
            }

            return true;
        }),

    body("confirm_password")
        .not()
        .notEmpty()
        .withMessage("The password confirmation field is required")
];

// Define validation rules for updating a user
const updateUser = [
    body("name")
        .trim()
        .not()
        .notEmpty()
        .withMessage("The name field is required")
        .isString()
        .isLength({max: 255})
        .withMessage("The name field can have a maximum length of 255 characters"),
];

// Define validation rules for update user password
const updateUserPassword = [
    body("password")
        .not()
        .notEmpty()
        .withMessage("The password field is required")
        .isLength({min: 8})
        .withMessage("The password field can have a minimum length of 8")
        .custom((value, {req}) => {
            if (value !== req.body.confirm_password) {
                throw new Error("Passwords do not match");
            }

            return true;
        }),

    body("confirm_password")
        .not()
        .notEmpty()
        .withMessage("The password confirmation field is required")
];

// Define validation rules for updating a user status
const updateUserStatus = [
    body("status")
        .not()
        .notEmpty()
        .withMessage("The status field is required")
        .isInt()
        .withMessage("Status must be an integer")
        .custom((value) => {
            if (!UserStatus.getLabel(value)) {
                throw new Error("Invalid user status.");
            }
            return true;
        }),
];

// Define validation rules for updating a user role
const updateUserRole = [
    body("role")
        .not()
        .notEmpty()
        .withMessage("The role field is required")
        .isInt()
        .withMessage("Role must be an integer")
        .custom((value) => {
            if (!UserRole.getLabel(value)) {
                throw new Error("Invalid user role.");
            }
            return true;
        }),
];

module.exports = {
    createUser,
    updateUser,
    updateUserPassword,
    updateUserStatus,
    updateUserRole,
};
