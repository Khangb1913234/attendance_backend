const app = require("./app")
const config = require("./app/config")
const mongoose = require("mongoose")
const PORT = config.app.port

mongoose.connect(config.db.uri)
    .then(function(){
        console.log("Connect to the local database")
    })
    .catch(function(err){
        console.log("Can not connect to the database", err)
        process.exit()
    })
    
app.listen(PORT, function(){
    console.log(`Port: ${PORT}`)
})