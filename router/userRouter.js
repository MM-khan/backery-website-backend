const express = require("express");
const User = require("../userModel");
const router = express.Router();

router.post("/register", async (req,res)=>{
    const {name,email,pass} = req.body;
    const newUser =await new User({name,email,pass})
    // console.log(newUser);
    try {
        newUser.save();
        res.send("user registertion successfully")
    } catch (error) {
       return res.status(400).json({message:error}) 
    }
});
// login router

router.post("/login", async(req,res)=>{
    const {email,pass} = req.body
    try {
        const user = await User.find({email,pass})
        if(user.length > 0){
            res.send("user login Successfully")
        }
    } catch (error) {
        return res.status(400).json({message:error}) 
    }
})
module.exports = router;