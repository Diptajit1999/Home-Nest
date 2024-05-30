const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileImagePath:{
        type:String,
        default:""
    },
    tripList:{
        type:Array,
        default:[]
    },
    wishList:{
        type:Array,
        default:[]
    },
    propertyList:{
        type:Array,
        default:[]
    },
    reservationList:{
        type:Array,
        default:[]
    }
},{
    versionKey:false,
    timestamps:true
})


const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}