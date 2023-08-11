const mongoose =require("mongoose");
const bcrypt = require("bcryptjs")
const jwt =require("jsonwebtoken");
const cookieParser=require("cookie-parser")


const todoSchema = new mongoose.Schema({
    UserId:{
        type:String,
        required:true,
    },
    items:[
        {
        item:{
        type:String,
        required:true
        }
    }
    ]
    
})

todoSchema.methods.addItem= async function (e){
    try{
        this.items=this.items.concat({item:e});
        await this.save()
        return this.items;
    }
    catch(err){

    }
}

const Todo= mongoose.model("ITEM",todoSchema);

module.exports= Todo;