const path = require("path")
const express = require("express")
const server = require("http")
const socketIO = require("socket.io")

const app = express()
const io = socketIO()

const PORT = process.env.PORT || 8080

// listening the user's connections
io.on("connection", (socket) => {
  console.log("Connection has been created")
})

// serving the the static files : default is public
app.use(express.static(path.join(__dirname, "public")))

// Server is running
app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`)
})
