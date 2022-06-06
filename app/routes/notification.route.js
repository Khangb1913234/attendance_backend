const express = require("express");
const notifications = require("../controllers/notification.controller");

module.exports = function(app){
    const router = express.Router();
    router.post("/", notifications.create);
    router.get("/", notifications.findAll);
    router.get("/:id", notifications.findOne);
    router.put("/:id", notifications.update);
    router.delete("/:id", notifications.delete);
    router.delete("/", notifications.deleteAll);
    app.use("/api/notifications", router);
};