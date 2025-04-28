const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
  userName:{
    type: String,
    required:[true,"Please add the user name"]
  },
  email:{
    type: String,
    required:[true,"Please add the email"],
    unique:[true,"email address already taken"]
  },
  password:{
    type: String,
    required:[true,"Please add the user password"]
  },
},
{
  timestamps:true,
})

module.exports=mongoose.model("user",userSchema);