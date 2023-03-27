const express= require("express")
const { connection } = require("./db")
const { auth } = require("./middlewares/auth.middleware")
const {userRouter} = require("./routes/user.routes")
const app= express()

app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use(auth)

app.use("/posts",postRouter)




app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log("Cannot connect to DB")
        console.log(err)
    }
    console.log(`Server running at ${process.env.port}`)
})