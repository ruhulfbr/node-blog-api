const environment = process.env.NODE_ENV || "test";

const suffix = {
    dev: "-dev",
    development: "-dev",
    test: "-test",
};

console.log("sdakshgdh", process.env.DEBUG);

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
