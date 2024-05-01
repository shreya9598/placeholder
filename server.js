const express = require("express")
const { createCanvas }  = require('canvas');

const app = express()

const userRouter = require("./routes/users")
const imageRouter = require("./routes/images")

app.use("/users", userRouter)
app.use("/images", imageRouter)


const PORT = 3000
app.listen(PORT, ()=>{
    console.log("server is listenign at "+ PORT)
})