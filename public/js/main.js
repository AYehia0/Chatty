// the socket
const socket = io()

// Document
const messageForm = document.getElementById("chat-form")
const chatMessagesDiv = document.querySelector(".chat-messages")

// Main functions
const addMessageToHtml = (message) => {
  const messageEl = document.createElement("div")

  // html
  messageEl.innerHTML = `<p class="meta">Ahmed<span>12:29AM</span></p>

  <p class="text">${message}</p>
  `

  // the css message
  messageEl.classList.add("message")

  // appending to the chat window
  chatMessagesDiv.appendChild(messageEl)
}

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
