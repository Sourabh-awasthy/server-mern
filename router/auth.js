const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken");

const Authenticate = require ("../middleware/authenticate")
require("../db/conn");


const User =require("../model/userSchema");
const Todo =require("../model/todoSchema");

router.get("/",(req,res)=>{
    res.send(`<h1>Home page</h1>`)
})


router.post("/add",async(req,res)=>{
  const {inputText,jwttoken}=req.body;

  if(!inputText || !jwttoken){
    return res.status(422).json({ error: "Fill some data " });
  }
  try{
    const verifyToken=jwt.verify(jwttoken,process.env.SECRET_KEY);
    const rootUser =await User.findOne({_id:verifyToken._id,'tokens.token':jwttoken});
    console.log(rootUser._id);
    console.log(inputText);
    const fieldsExist= await Todo.findOne({UserId:rootUser._id});
    if(fieldsExist){
        const add= await fieldsExist.addItem(inputText);
        if(add){
          return res.status(201).json(inputText)
        }
    }
    else{
      const todo= new Todo({UserId:rootUser._id,items:[{item:inputText}]});
      const save = todo.save();
      if(save){
        return res.status(201).json(inputText)
      }
    }
    
  }
  catch(err){console.log(err)}
})

router.post("/call", async (req,res)=>{
  const {jwttoken} = req.body;

  try{
  const verifyToken= jwt.verify(jwttoken,process.env.SECRET_KEY);
  const rootUser =await User.findOne({_id:verifyToken._id,'tokens.token':jwttoken});
  const field= await Todo.findOne({UserId:rootUser._id})
  
    res.status(201).json(field.items);
  
  
}
catch(err){console.log(err)}

})
router.post("/register", async (req, res) => {
    const { name, email, phone, password } = req.body;
  
    if (!name || !email || !phone || !password) {
      return res.status(422).json({ error: "Fill all the fields" });
    }
  
    try {
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        return res.status(422).json({ error: "You are already registered" });
      } else {
        const user = new User({ name, email, phone, password });
        const save = await user.save();
        if (save) {
          console.log("Successfully registered");
          return res.status(201).json({ message: "Successfully registered" });
        }
      }
    } catch (err) {
      console.log("Error:", err);
      return res.status(500).json({ error: "Failed to register" });
    }
  });
  
router.delete("/delete/:id", async (req,res)=>{
  const {id,jwttoken} = req.body;
 
  try {
    const verifyToken= jwt.verify(jwttoken,process.env.SECRET_KEY);
    const rootUser =await User.findOne({_id:verifyToken._id,'tokens.token':jwttoken}) 
     const todo = await Todo.findOne({ UserId: rootUser._id });

    if (!todo) {
      return res.status(404).json({ success: false, error: "Todo not found" });
    }

    todo.items = todo.items.filter(item => item._id.toString() !== id);

    await todo.save();

    res.status(201).json({message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




router.post("/login",async (req,res)=>{

    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({error:"Please fill all fields"})
        }
        const Userlogin= await User.findOne({email:email})
        if(Userlogin){
            const isMatch= await bcrypt.compare(password.toString(),Userlogin.password);

            
            let token = await Userlogin.generateAuthToken();
            const length= token.length;

            // res.cookie("jwttoken",token,{
            //   expires: new Date(Date.now()+30*24*60*60*1000),
            //     httpOnly:true , sameSite: "none",
            //     path: "/"
            // });

            if(!isMatch){
                res.status(400).json({error:"invalid login"})
                console.log("invalid credentials")}

                
                
            else{
                res.status(201).json(token[(length-1)]);
                console.log("User login success")
                
                
        }
    }
    
        else{
            res.status(400).json({error:"Register First"})
            console.log("Register First")}
    }
    catch(err){
        console.log(err)
    }
    
})

router.post("/about",async (req,res)=>{

try{
  const {tokenFrom}= req.body;
  
  const verifyToken= jwt.verify(tokenFrom,process.env.SECRET_KEY);
  console.log("THIS IS MY PROFILE");
        const rootUser =await User.findOne({_id:verifyToken._id,'tokens.token':tokenFrom})
        res.status(201).json(rootUser);

}
  
  catch(err){console.log(err)}
})



module.exports=router;