require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const traiteurRoutes = require('./routes/traiteur')
const recRoutes = require('./routes/reclamation')
const equiRoutes = require('./routes/equipement')
const notiRoutes = require('./routes/notification')
const interRoutes = require('./routes/intervention')
const ws = require('ws')
const { Server } = require('socket.io');


const cors = require('cors')
// express app
const app = express()
app.use(cors())


// set the maximum payload size to 50mb
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//routes
app.use('/api/user', userRoutes)
app.use('/api/inter', interRoutes)
app.use('/api/rec', recRoutes)
app.use('/api/equi', equiRoutes)
app.use('/api/trait', traiteurRoutes)
app.use('/api/notification',notiRoutes )
// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
   
  })
  .catch((err) => {
    console.log(err)
  }) 
  const server = app.listen(process.env.PORT, () => {
    console.log('listening for requests on port', process.env.PORT)
  })
  const wss =new ws.WebSocketServer({server})
  wss.on('connection',(connection)=>{
    console.log('connected');
    connection.send("hello")
  })

const io = new Server({ 
  cors:{
    origin:"http://localhost:3000"
  }
});
let onlineUsers=[];
const addNewUser =(username, socketId)=>{
  !onlineUsers.some((user) =>user.username === username) && 
  onlineUsers.push({username,socketId})
}
const removeUser = (socketId)=>{
  onlineUsers= onlineUsers.filter(user =>user.socketId !== socketId)
}
const getUser = (username)=>{
  return onlineUsers.find((user )=> user.username === username)
}
io.on("connection", (socket) => {
  socket.on('NEW USER ',(username)=>{
    addNewUser(username,socket.id)
  })
  console.log("someone has connected !")
  socket.on("sendNotification",({senderName,receiverName,type})=>{
    const receiver = getUser(receiverName)
    io.to(receiver.socketId).emit("getNotification",{
      senderName,
      type,
    })
  })
  socket.on("disconnect",()=>{
    removeUser(socket.id)
    console.log("Disconnect")
  })
});

io.listen(5000);