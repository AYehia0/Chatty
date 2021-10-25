// the socket
const socket = io()

// getting the username and room
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
})

// Document
const messageForm = document.getElementById("chat-form")
const chatMessagesDiv = document.querySelector(".chat-messages")
const roomNameEl = document.querySelector('#room-name')
const roomMembersUl = document.querySelector('#users')

// Main functions
const addMessageToHtml = (message) => {
  const messageEl = document.createElement("div")

  // html
  messageEl.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>

  <p class="text">${message.text}</p>
  `

  // the css message
  messageEl.classList.add("message")

  // appending to the chat window
  chatMessagesDiv.appendChild(messageEl)
}

// room html details 

const showRoomDetails = (roomName, usersInRoom) => {

  // setting the name for the room 
  roomNameEl.innerHTML = roomName


  // clearing the members
  roomMembersUl.innerHTML = ""

  // adding the members
  usersInRoom.forEach(user => {

    const userLi = document.createElement("li")

    userLi.innerHTML = `<li>${user.username}</li>`

    roomMembersUl.appendChild(userLi)
  })

}

// joining a room
// catch it in the server side
socket.emit("roomJoin", { username, room })

// listing all the users
socket.on('roomUsers', ({room , users}) => {

  // show users to the html 
  showRoomDetails(room, users)

})

socket.on("message", (message) => {
  // add the messages to the html
  addMessageToHtml(message)

  // scroll to the message
  chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight
})

messageForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // getting the message
  const message = e.target.elements.msg.value

  // if the message isn't empty
  if (message) {
    // emit it
    socket.emit("chatMessages", message)

    // clearing
    messageForm.reset()
  }
})
