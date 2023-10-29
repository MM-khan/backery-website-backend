const express = require("express");
const app = express();
const port =4000;
const db = require("./database");
const cakeRouter = require("./router/cakeRouter");
const orderRoute = require("./router/orderRouter")


app.use(express.json())
app.use("/cakeapi", cakeRouter);
app.use("/api/users",require("./router/userRouter"))
app.use("/api", orderRoute)

app.get("/", (req,res)=>{
    res.send("hello");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})