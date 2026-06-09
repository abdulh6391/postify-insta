const Follow = require("../models/FollowModel");
const User = require("../models/userModel");

async function followTheUser(req, res){
  const followerId = req.user.id;
  const followeeUsername = req.params.username;

  const followee=await User.findOne({username:followeeUsername})

  if(!followee)
  {
    return res.status(404).json({
      msg:"Followee Does Not exist"
    })
  }

  if(followerId == followee._id.toString())
  {
    return res.status(403).json({
      msg:"You cannot Follow Yourself"
    })
  }

  const isAlreadyReqSent=await Follow.findOne({
    follower:followerId,
    followee:followee._id
  })

  if(isAlreadyReqSent)
  {
    return res.status(400).json({
      msg:"req already send"
    })
  }

  const follow=await Follow.create({
    follower:followerId,
    followee:followee._id
  })

  return res.status(201).json({
    msg:"Follow Req sent",
    follow
  })

}

async function acceptRequest(req,res)
{
  const followeeId=req.user.id
  const followerId=req.params.followerId

  const request=await Follow.findOne({
    follower:followerId,
    followee:followeeId
  })

  if(!request)
  {
    return res.status(404).json({
      msg:"Request not Found"
    })
  }

  request.status="accepted"
  await request.save(); 

  res.json({
    msg:"Follow request Accepted",
    request
  })
}

async function rejectTheRequest(req,res)
{
  const followeeUsername=req.user.username
  const followerId=req.params.followerId

  const followee=await User.findOne({
    username:followeeUsername
  })

  if(!followee)
  {
    return res.status(400).json({
      msg:"Followee Does not Exists"
    })
  }

  const request=await Follow.findOne({
    follower:followerId,
    followee:followee._id
  })

  if(!request)
  {
    return res.status(400).json({
      msg:"Request not Found"
    })
  }

  request.status="rejected"
  await request.save()

  await Follow.findOneAndDelete({
    follower:followerId,
    followee:followee._id,
    status:"rejected"
  })


  return res.status(200).json({
    msg:"Request Rejected SuccessFully and UnFollowed",
    request
    
  })
}

async function unFollowUser(req,res)
{
  const followerId=req.user.id
  const followeeUsername=req.params.username

  const followee=await User.findOne({
    username:followeeUsername
  })

  if(!followee)
  {
    return res.status(403).json({
      msg:"Followee not Found"
    })
  }

  if(followerId == followee._id.toString())
  {
    return res.status(403).json({
      msg:"You cannot UnFollow Yourself"
    })
  }

  const follow=await Follow.findOne({
    follower:followerId,
    followee:followee._id
  })

  if(!follow)
  {
    return res.status(403).json({
      msg:"You cannot unfollow Again"
    })
  }

  await Follow.findOneAndDelete({
    follower:followerId,
    followee:followee._id
  })

  return res.status(200).json({
    msg:"You unFollow This user",
    follow
  })
}

module.exports = { followTheUser,acceptRequest,rejectTheRequest,unFollowUser };
