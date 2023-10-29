const mongoose = require("mongoose");

const database = "mongodb+srv://gofood:food12345@cluster0.2sexopl.mongodb.net/cakeBakery"
mongoose.connect(database,{useNewUrlParser:true, useUnifiedTopology:true});

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log("database connected successfully");
})
db.on('error',()=>{
    console.log("connection failed");
})
