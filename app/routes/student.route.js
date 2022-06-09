const express = require("express");
const students = require("../controllers/student.controller");
const { verifyToken } = require("../middlewares");

module.exports = function(app){
    const router = express.Router();
    router.use(verifyToken);
    router.post("/", students.create);
    router.get("/", students.findAll);
    router.get("/:id", students.findOne);
    router.put("/:id", students.update);
    router.delete("/:id", students.delete);
    router.delete("/", students.deleteAll);
    app.use("/api/students", router);
};