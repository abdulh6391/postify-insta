const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
    caption:
    {
        type:String,
        default:"Hannan",
    },
    imgUrl:
    {
        type:String,
        required:[true,"Image Url is required for creating a imgUrl"]
    },
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"User id required for creating a post"]
    }
})

const Post=mongoose.model("post",postSchema);
module.exports=Post