const express = require("express");
const router = express.Router();
const modal = require("../models");

router.get("/cakedata",async(req,res)=>{
    try {
        const cakes =await modal.find({})
        res.send(cakes)
        console.log(cakes);
        
    } catch (error) {
        return res.status(400).json({massage:"error"})
    }
});
module.exports = router