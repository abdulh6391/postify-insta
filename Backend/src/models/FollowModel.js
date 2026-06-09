const mongoose=require("mongoose")

const followSchema=new mongoose.Schema({
    follower:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    followee:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    status:
    {
        type:String,
        default:"pending",
        enum:
        {
            values:["pending","rejected","accepted"],
            message:"status can only be pending, rejected,and accepted"
        }
    }

},{timestamps:true})

followSchema.index({follower:1,followee:1},{unique:true})

const Follow=mongoose.model("follow",followSchema)
module.exports=Follow