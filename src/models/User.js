const { DataTypes, Sequelize } = require("sequelize");
const { hashSync } = require("bcrypt");
const { sequelize } = require("../utils/db");
const Subscription = require("./Subscription");

/*
id: number;
    fullName: string;
    email: string;
    phone: string;
    profilePic: null;
    sub: string;
    subExpire: Date;
    invitations: number;
    freeze: number;
    isFrozen: boolean;          XXXXXXXXXX
    memberSince: Date; 
    accountType: "Member" | "Admin" | "Superuser";
*/
const User = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            defaultValue: null,
            set(value) {
                const password = hashSync(value, 12);
                this.setDataValue("password", password);
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        profilePic: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        subExpire: {
            type: DataTypes.DATEONLY,
            defaultValue: null,
        },
        invitations: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        freeze: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        frozenSince: {
            type: DataTypes.DATEONLY,
            defaultValue: null,
        },
        accountType: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            get() {
                const types = ["member", "admin", "superuser"];
                const value = this.getDataValue("accountType");
                return types[value];
            },
            set(value = "member") {
                const types = ["member", "admin", "superuser"];
                const index = types.findIndex((v) => v.toLowerCase() === value);
                this.setDataValue("accountType", index === -1 ? 2 : index);
            },
        },
    },
    { createdAt: "memberSince" }
);

User.belongsTo(Subscription, { foreignKey: "subId" });

module.exports = User;
