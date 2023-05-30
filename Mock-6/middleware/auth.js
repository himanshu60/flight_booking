const jwt=require("jsonwebtoken");
const auth=async(req,res,next)=>{
    try {
       let token=req.headers.authorization;
       const decode=jwt.verify(token,"masai");
       if(decode){
        next();
       }else{
        res.status(201).send("please login first")
       }
    } catch (error) {
        res.status(201).json({msg:"login first",err:error.message})
    }
}
module.exports={auth}