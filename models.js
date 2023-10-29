const mongoose = require("mongoose");

 const cakeSchema = mongoose.Schema({
    name :{
        type:String,
        require
    },
    varients:[],
    prices:[],
    category:{
        type:String,
        require
    },
    img:{
        type:String,
        require
    },
    discreption:{
        type:String,
        require
    },
 },{
    timestamps: true 
  });
 module.exports = mongoose.model("customars",cakeSchema)