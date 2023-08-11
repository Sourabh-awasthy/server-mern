const mongoose=require("mongoose");


mongoose.connect(process.env.DATABASE,{useNewUrlParser: true})
.then(()=>{console.log("connection success")})
.catch((err)=>console.log(err));