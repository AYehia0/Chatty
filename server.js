const path = require("path")
const express = require("express")
const app = express()

// Messages
const welcomeMsg = "Welcome to the chatapp"
const connectMsg = "User has been connected"
const disconnectMsg = "User has been disconnected"

// creating the server
const server = require("http").Server(app)
const io = require("socket.io")(server)

const PORT = process.env.PORT || 8080

// listening the user's connections
io.on("connection", (socket) => {
  // welcome the user
  socket.emit("message", welcomeMsg)

  // brodcasting to all the users except the the one who joined
  socket.broadcast.emit("message", connectMsg)

  // on disconnect
  socket.on("disconnect", () => {
    io.emit("message", disconnectMsg)
  })

  // checking for chat messages
  socket.on("chatMessages", (message) => {
    io.emit("message", message)
  })
})

// serving the the static files : default is public
app.use(express.static(path.join(__dirname, "public")))

// Server is running
server.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`)
})
