const {
    create,
    getById,
    getAll,
    deleteById,
    getActive,
    update,
} = require("../controllers/subscriptions");

const Router = require("express").Router();

Router.post("/create", create);
Router.get("/get/:id", getById);
Router.get("/get", getAll);
Router.get("/getActive", getActive);
Router.delete("/delete/:id", deleteById);
Router.patch("/update/:id", update);

module.exports = Router;
