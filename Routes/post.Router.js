const express=require("express")

const {PostModel}=require("../Model/post.model");



const postRoute=express.Router()

postRoute.use(express.json())

postRoute.post("/",async(req,res)=>{
    
    try{
        const data=req.body
       const post=new PostModel(data)
       await post.save()
       console.log(post)
       res.send(post)
    }catch(err){
        console.log(err)
    }
})

postRoute.get("/",async(req,res)=>{
      const data=req.query
    try{
      
       const post=await PostModel.find(data);

       console.log(post)
       res.send(post)
    }catch(err){
     
        console.log(err)
    }
})

postRoute.patch("/:id",async(req,res)=>{
    const data=req.query
  try{
    
     const post=await PostModel.find(data);

     console.log(post)
     res.send(post)
  }catch(err){
   
      console.log(err)
  }
})

module.exports={
    postRoute
}
