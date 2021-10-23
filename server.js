const path = require("path")
const express = require("express")
const app = express()

// Main bot
const bot = "BOT"

// Messages
const getMessageFormatted = require("./utils/messages")
const welcomeMsg = "Welcome to the chatapp"
const connectMsg = "has been connected"
const disconnectMsg = "has been disconnected"

// Users
const {
  getAllUsers,
  getUserById,
  disconnectUser,
  joinUser,
} = require("./utils/users")

// creating the server
const server = require("http").Server(app)
const io = require("socket.io")(server)

const PORT = process.env.PORT || 8080


// listening the user's connections
io.on("connection", (socket) => {

  // room joining
  socket.on("roomJoin", ({ username, room }) => {


    console.log(`${username} has joined ${room}`)
    const user = joinUser(socket.id, username, room)

    socket.join(user.room)

    // welcome the user
    socket.emit("message", getMessageFormatted(bot, welcomeMsg))

    // brodcasting to all the users except the the one who joined
    socket.broadcast
      .to(user.room)
      .emit("message", getMessageFormatted(bot, `${username} ${connectMsg}`))
  })

  // checking for chat messages
  socket.on("chatMessages", (message) => {

    const currentUser = getUserById(socket.id)

    io.to(currentUser.room).emit("message", getMessageFormatted(currentUser.username, message) )
  })

  // on disconnect
  socket.on("disconnect", () => {

    const user = disconnectUser(socket.id)
    io.to(user.room).emit("message", getMessageFormatted(bot, `${user.username} ${disconnectMsg}` ))
  })
})

// serving the the static files : default is public
app.use(express.static(path.join(__dirname, "public")))

// Server is running
server.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`)
})
