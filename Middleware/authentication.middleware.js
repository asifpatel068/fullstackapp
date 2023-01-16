var jwt = require('jsonwebtoken');

const auth=(req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        const decoded=jwt.verify(token,"masai")
        if(decoded){
            const userID=decoded.userID
            req.body.userID=userID
            next()
        }else{
            res.send("please Login First")
        }
    }else{
        res.send("Please login first")
    }
}

module.exports={
    auth
}