const {
    createMember,
    deleteMember,
    getById,
    demote,
    promote,
    createSuperuser,
} = require("../controllers/users");

const Router = require("express").Router();

Router.get("/get/:id", getById);
Router.post("/createMember", createMember);
Router.post("/createSuperuser", createSuperuser);
Router.delete("/deleteMember/:id", deleteMember);
Router.patch("/promote/:id", promote);
Router.patch("/demote/:id", demote);

module.exports = Router;
