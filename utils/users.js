const fs = require("fs")
const path = require("path")

// users are located in a json file
const usersFile = "users.json"

// add user
const joinUser = (id, username, room) => {
  const user = {
    id,
    username,
    room,
  }

  const users = getAllUsers()

  // adding
  users.push(user)

  // writing
  fs.writeFileSync(path.join(__dirname, usersFile), JSON.stringify(users) )

  return user
}

// get all the users
const getAllUsers = () => {
  const fileHandler = fs.readFileSync(path.join(__dirname, usersFile))

  const data = JSON.parse(fileHandler)

  return data
}
// using id
const getUserById = (id) => {
  // reading users
  const users = getAllUsers()

  const user = users.find(user => user.id == id)

  return user
}

// disconnect user
const disconnectUser = (id) => {
  // reading users
  const users = getAllUsers()

  const userInd = users.findIndex(user => user.id == id)

  const user = users[userInd]

  users.splice(userInd, 1)

  // saving
  fs.writeFileSync(path.join(__dirname, usersFile), JSON.stringify(users))

  return user
}

module.exports = {
  getAllUsers,
  joinUser,
  getUserById,
  disconnectUser,
}
