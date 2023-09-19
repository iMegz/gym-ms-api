const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../utils/db");

const Subscription = sequelize.define("subscription", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    freeze: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    invitations: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    startAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
    },
    endAt: {
        type: DataTypes.DATEONLY,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = Subscription;
