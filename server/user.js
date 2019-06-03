const express = require("express")
const utils = require("utility")
const Router = express.Router()
const models = require("./model")
const User = models.getModel("user")
const Chat = models.getModel("chat")
const _filter = {"pwd":0,"__v":0}
//获取用户信息
Router.get("/info",function(req,res){
  const { userid } = req.cookies
  if(!userid){
    return res.json({code:1})
  }
  User.findOne({_id:userid},_filter,function(err,doc){
    if(err){
      return res.json({code:1,msg:"后端出错!"})
    }
    if(doc){
      return res.json({code:0,data:doc})
    }
  })
})
//获取用户列表
Router.get("/list",function(req,res){
  const { type } = req.query
  // User.remove({},function(err,doc){})
  User.find({ type },_filter,function(err,doc){
    return res.json({code:0,data:doc})
  })
})
//更新用户状态
Router.post("/update",function(req,res){
  const userid = req.cookies.userid
  if(!userid){
    return JSON.dumps({code:1})
  }
  const body = req.body
  User.findByIdAndUpdate(userid,body,function(err,doc){
    const data = Object.assign({},{
      user:doc.user,
      type:doc.type
    },body)
    return res.json({code:0,data})
  })
})
//登录
Router.post("/login",function(req,res){
  const { user , pwd } = req.body
  User.findOne({user:user, pwd:md5Pwd(pwd)},_filter,function(err,doc){
    if(!doc){
      return res.json({code:1,msg:"用户名或密码错误!"})
    }
    res.cookie("userid",doc._id)
    return res.json({code:0,data:doc})
  })
})
//注册
Router.post("/register",function(req,res){
  const { user , pwd , type } = req.body
  User.findOne({user:user},function(err,doc){
    if(doc){
      return res.json({code:1,msg:"用户名重复"})
    }else{
      const userModel = new User({user,type,pwd:md5Pwd(pwd)})
      userModel.save(function(e,d){
        if(e){
          return res.json({code:1,msg:"后端出错"})
        }
        const { user , type , _id} = d
        res.cookie("userid",_id)
        return res.json({code:0,data:{user , type , _id}})
      })
      // User.create({user,type,pwd:md5Pwd(pwd)},function(err,doc){
      //   if(err){
      //     return res.json({code:1,msg:"后端出错"})
      //   }
      //   return res.json({code:0,msg:"注册成功"})
      // })
    }
  })
})
//获取消息列表
Router.get("/getMsgList",function(req,res){
  const user = req.cookies.userid
  // /"$or":[{from:user,to:user}]
  User.find({},function(e,userdoc){
    let users = {}
    userdoc.forEach(v=>{
      users[v._id] = {name:v.user,avatar:v.avatar}
    })
    Chat.find({"$or":[{from:user},{to:user}]},function (err,doc) { 
      if(!err){
        return res.json({code:0,msgs:doc,users:users})
      }
     })
  })
 
})
//读取信息/readmsg
Router.post("/readmsg",function (req,res) {
  const userid = req.cookies.userid
  const {from} = req.body
  Chat.update(
    {from,to:userid},
    {"$set":{read:true}},
    {"multi":true},function(err,doc){
    if(!err){
      return res.json({code:0,num:doc.nModified})
    }
    return res.json({code:1,mag:"修改成功"})
  })
})
//md5加密
function md5Pwd(pwd){
  const salt = "zhq@@!#$%^&~~"
  return utils.md5(utils.md5(salt+pwd))
}
module.exports = Router