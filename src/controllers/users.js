const Model = require("../models/User");
const { log } = require("./logs");

const SUPERUSER = 2;

// Get user by Id
exports.getById = async function (req, res, next) {
    const { id } = req.params;

    try {
        const user = await Model.findByPk(id, {
            attributes: { exclude: "password" },
        });
        const status = user ? 200 : 404;
        res.status(status).json(user);
    } catch (error) {
        next({ msg: "Failed to get member account" });
    }
};

// Create member account
exports.createMember = async function (req, res, next) {
    const { fullName, email, phone } = req.body;

    try {
        await Model.create({ fullName, email, phone });

        log("memberAdd"); // Log action to db

        res.status(201).json({ msg: "Member account created" });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            const path = error.errors[0].path; // email or phone
            next({ msg: `Failed to create account, ${path} already exists` });
        } else next({ msg: "Failed to create member account" });
    }
};

// Create superuser
exports.createSuperuser = async function (req, res, next) {
    const data = {
        fullName: "Admin",
        email: `admin@${req.hostname}`,
        phone: "00000000000",
        accountType: "superuser",
        password: "admin",
    };

    try {
        const exists = await Model.findOne({
            where: { accountType: SUPERUSER },
        });

        if (exists) {
            res.status(400).json({ msg: "Superuser already exists" });
        } else {
            await Model.create(data);

            // Log action to db

            res.status(201).json({ msg: "Superuser account created" });
        }
    } catch (error) {
        next({ msg: "Failed to create Superuser account" });
    }
};

// Promote to admin
exports.promote = async function (req, res, next) {
    const { id } = req.params;
    try {
        const [rowsCount, rows] = await Model.update(
            { accountType: "admin" },
            { where: { id } }
        );

        if (rowsCount) log("adminAdd", rows); // Log action to database

        const msg = rowsCount ? "Member promoted to admin" : "Member not found";
        const status = rowsCount ? 200 : 404;

        res.status(status).json({ msg });
    } catch (error) {
        next({ msg: "Failed to promote member to admin" });
    }
};

// demote to member
exports.demote = async function (req, res, next) {
    const { id } = req.params;
    try {
        const [rowsCount, rows] = await Model.update(
            { accountType: "member" },
            { where: { id } }
        );

        if (rowsCount) log("adminRemove", rows); // Log action to database

        const msg = rowsCount ? "Admin demoted to member" : "Admin not found";
        const status = rowsCount ? 200 : 404;

        res.status(status).json({ msg });
    } catch (error) {
        next({ msg: "Failed to demote admin to member" });
    }
};

//------------------------
// Update user info
// Update profile pic
// Change password
//------------------------

// Delete member account
exports.deleteMember = async function (req, res, next) {
    const { id } = req.params;

    try {
        const rows = await Model.destroy({ where: { id } });

        if (rows) log("memberRemove"); // Log action to db

        const status = rows ? 200 : 404;
        const msg = rows ? "Member deleted" : "Member not found";
        res.status(status).json({ msg });
    } catch (error) {
        next({ msg: "Failed to delete member" });
    }
};
