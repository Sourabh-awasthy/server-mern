// const jwt = require("jsonwebtoken");
// const cors = require("cors")
// const User = require("../model/userSchema");
// const cookieParser = require("cookie-parser")



// const Authenticate=async (req,res,next)=>{
//         try{
//         const token = req.body.jwttoken;
        
//         const verifyToken= jwt.verify(token,process.env.SECRET_KEY);

//         const rootUser =await User.findOne({_id:verifyToken._id,'tokens.token':token})
        
//         if(!rootUser){
//             throw new Error("User not found");
//         }
       
        
//         next();
        
//     }
//     catch(err){
//         res.status(401).json({message:"unauthorized"})
//     }
        
// }


// module.exports =Authenticate;