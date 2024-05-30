const express=require("express");
const app=express()
const cors=require("cors")
const {connection}=require("./lib/db")
const {authRouter}=require("./routes/auth")
require("dotenv").config()

const Port=process.env.port || 5005
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use("/auth",authRouter)

app.listen(Port,async()=>{
    try {
        await connection;
        console.log("connected to the Database")
        console.log(`server is running at port ${Port}`)
    } catch (error) {
        console.log(error)
    }
})