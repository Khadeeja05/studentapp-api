const mongoose=require("mongoose");
const Schema=mongoose.Schema;

let Student=new Schema({
    name:{type:String},
    age:{type:String},
    department:{type:String}
});

module.exports=mongoose.model("Student",Student);