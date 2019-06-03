// const express = require("express");
// const mongoose = require("mongoose");
// const DB_URL = "mongodb://127.0.0.1:27017/imooc";
// //链接上mongoose创建imooc集合
// mongoose.connect(DB_URL)
// mongoose.connection.on("connected",function(){
//   console.log("mongo connect success")
// })
// const User = mongoose.model("user",new mongoose.Schema({
//   user:{type:String,require:true},
//   age:{type:Number,require:true},
// }))

// // User.create({
// //   user:'imooc',
// //   age:18
// // },function(err,doc){
// //   if(!err)console.log(doc)
// //   else console.log(err)
// // })

// const app = express();
// app.get("/",function(req,res){
//   res.send("<h1>hello world</h1>")
// })
// app.get("/data",function(req,res){

//   User.find({},function(err,doc){
//     res.json(doc)
//   })
// })
// app.get("/delect",function(req,res){

//   User.remove({"age":18},function(err,doc){
//     res.json(doc)
//   })
// })
// app.get("/updata",function(req,res){

//   User.update({"user":"imooc"},{"$set":{age:26}},function(err,doc){
//     res.json(doc)
//   })
// })
// app.listen(9090,function(){
//   console.log("Node app start at port 9090")
// })


const express = require("express");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const userRouter = require("./user")
const models = require("./model")
const Chat = models.getModel("chat")
const path = require("path")
const app = express();
//work with express
const server = require("http").Server(app)

const io = require("socket.io")(server)

io.on("connection", function (socket) {
  // console.log("user login")
  socket.on("sendmsg", function (data) {
    const {from,to,msg} = data;
    const chatid = [from, to].sort().join("_")
    Chat.create({chatid,from,to,content: msg}, function (err, doc) {
      console.log(doc)
      io.emit("recvmsg",Object.assign({},doc._doc))
    })
    // io.emit("recvmsg",data) res.json({code:0,data:doc})
  })
})



app.use(cookieParser());
app.use(bodyParser.json())
app.use("/user", userRouter)
app.use(function(req,res,next){
  if(req.url.startsWith("/user/")||req.url.startsWith("/static/")){
    return next()
  }
  return res.sendFile(path.resolve("build/index.html"))
})
app.use("/",express.static(path.resolve("build")))
server.listen(9090, function () {
  console.log("Node app start at port 9090")
})