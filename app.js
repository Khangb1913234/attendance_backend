const express = require("express")
const cors = require("cors")
const app = express()
const setupStudentRoutes = require("./app/routes/student.route");
const setupNotificationRoutes = require("./app/routes/notification.route")
const setupAuthRoutes = require("./app/routes/auth.route");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.json({message: "Thai Khung"})
})

app.get("/test", function(req, res){
    res.json({message: "Test"})
})
setupStudentRoutes(app)
setupNotificationRoutes(app)
setupAuthRoutes(app);

module.exports = app