const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_51NiXYRCo6uu3U8wiLYtcwtCcmzNvRcwSBIYVzkmLNFmmRRGLl76Ls1t4bYFjabIFr6V57o8n9HhM0SRrymfdmiap00pl6osZkc");
const { v4: uuidv4 } = require('uuid');
const orders = require("../orderModel")

router.post("/orders", (req,res)=>{
    const {token,subtotal,currentUser,cartitems} = req.body;
    try {
        const customar = stripe.customars.create({
            email:token.email,
            source:token.id
        })
        const payment = stripe.charges.create({
            amount:subtotal*100,
            currency:"PKR",
            customar:customar.id,
            reciept_email: token.email
        },{
            idempotencyKey:uuidv4()
        })
        if(payment){
            const newOrder = new orders({
                name:currentUser.name,
                email:currentUser.email,
                userid:currentUser._id,
                orderItem:cartitems,
                orderAmount:subtotal,
                shippingAddress:{
                    country:token.card.address_country,
                    city:token.card.address_city,
                    street:token.card.address_line1,
                    postelCode:token.card.address_zip
                },
                transactionId:payment.source.id
            })
                newOrder.save();
            res.send("payment successful")
        }else{
            res.send("payment failed")
        }
    } catch (error) {
        res.status(400).json({message:"some thing went wrong"})
    }
});


router.post("/getorder", async(req,res)=>{
    const {userid} = req.body;
    try {
        const order = await orders.find({userid:userid});
        res.send(order)
    } catch (error) {
        res.status(400).json({message:"some thing went wrong in getorder"}) 
    }
})
module.exports = router