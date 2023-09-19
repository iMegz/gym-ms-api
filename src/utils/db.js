const { Sequelize } = require("sequelize");

const options = process.env.DB_URI || {
    dialect: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_UNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    logging: false,
};

const sequelize = new Sequelize(options);

/**
 * Authenticate connection to db
 * @param {Function} cb - Callback function
 */
exports.connect = async (cb) => {
    try {
        await sequelize.authenticate();
        require("../models/index");
        await sequelize.sync({ alter: true });
        console.log("Connected to DB");
        cb();
    } catch (error) {
        console.log("Failed to connect to DB", error);
    }
};

exports.sequelize = sequelize;
