const express=require("express")

const cors=require("cors")
const {connection}=require("./Config/db")
const {userRoute}=require("./Routes/user.Router")
const {postRoute}=require("./Routes/post.Router")

const {auth}=require("./Middleware/authentication.middleware")


const app=express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/users",userRoute)

app.use(auth)

app.use("/posts",postRoute)



app.listen(6060,async()=>{
    try{
        await connection
        console.log("connected to DB")
    }catch(err){
        console.log(err)
        console.log("Not connected to DB")
    }
    console.log("Server is Running at 6060")
})