const app = require("./app")
const config = require("./app/config")
const mongoose = require("mongoose")
const PORT = config.app.port

mongoose.connect("mongodb+srv://dangvudinhkhang:narutoroman2001@cluster0.urogsg5.mongodb.net/Attendance?retryWrites=true&w=majority")
    .then(function(){
        console.log("Connect to the database")
    })
    .catch(function(err){
        console.log("Can not connect to the database", err)
        process.exit()
    })
    
app.listen(PORT, function(){
    console.log(`Port: ${PORT}`)
})