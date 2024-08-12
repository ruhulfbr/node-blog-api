const environment = process.env.NODE_ENV || "test";

const suffix = {
    dev: "",
    development: "",
    test: "",
};

const options = {
    host: process.env.POSTGRES_HOST || "localhost",
    port: process.env.FORWARD_DB_PORT || "5432",
    database: `${process.env.DB_DATABASE || "blogs-api"}${
        suffix[environment] || suffix.test
    }`,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "password",
    dialect: "postgres",
    dialectOptions: {
        timezone: "Z",
    },
    // logging: process.env.DEBUG !== "false",
    logging: console.log,
};

module.exports = {
    development: {
        ...options,
    },
    test: {
        ...options,
    },
};
