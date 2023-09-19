const { Op } = require("sequelize");
const Model = require("../models/Subscription");
const { log } = require("./logs");

// Get subscription by Id
exports.getById = async function (req, res, next) {
    const { id } = req.params;

    try {
        const subscription = await Model.findOne({ where: { id } });
        const status = subscription ? 200 : 404;
        res.status(status).json(subscription);
    } catch (error) {
        next({ msg: "Failed to get subscription" });
    }
};

// Get all subscriptions
exports.getAll = async function (req, res, next) {
    try {
        const subscriptions = await Model.findAll();
        res.status(200).json(subscriptions);
    } catch (error) {
        next({ msg: "Failed to get subscriptions" });
    }
};

// Get active only
exports.getActive = async function (req, res, next) {
    try {
        const subscriptions = await Model.findAll({
            where: {
                active: true,
                [Op.or]: [{ endAt: null }, { endAt: { [Op.gte]: new Date() } }],
            },
        });
        res.status(200).json(subscriptions);
    } catch (error) {
        next({ msg: "Failed to get subscriptions" });
    }
};

// Create new subscription
exports.create = async function (req, res, next) {
    const { title, duration, freeze, invitations, price, startAt, endAt } =
        req.body;

    try {
        const subscription = await Model.create({
            title,
            duration,
            freeze,
            invitations,
            price,
            startAt,
            endAt,
        });

        log("subscriptionAdd"); // Log action to database

        res.status(201).json(subscription);
    } catch (error) {
        next({ msg: "Failed to create subscription" });
    }
};

// Delete subscription
exports.deleteById = async function (req, res, next) {
    const { id } = req.params;

    try {
        const rows = await Model.destroy({ where: { id } });

        if (rows) log("subscriptionRemove"); // Log action to database

        const msg = rows ? "Subscription deleted" : "Subscription not found";
        const status = rows ? 200 : 404;
        res.status(status).json({ msg });
    } catch (error) {
        next({ msg: "Failed to delete subscription" });
    }
};

// Update subscription
exports.update = async function (req, res, next) {
    const { id } = req.params;
    const {
        title,
        duration,
        freeze,
        invitations,
        price,
        startAt,
        endAt,
        active,
    } = req.body;

    try {
        const [rowsCount, rows] = await Model.update(
            {
                title,
                duration,
                freeze,
                invitations,
                price,
                startAt,
                endAt,
                active,
            },
            { where: { id } }
        );

        if (rowsCount) log("subscriptionChange", rows); // Log action to database

        const msg = rowsCount
            ? "Subscription updated"
            : "Subscription not found";
        const status = rowsCount ? 200 : 404;
        res.status(status).json({ msg });
    } catch (error) {
        next({ msg: "Failed to update subscription" });
    }
};
