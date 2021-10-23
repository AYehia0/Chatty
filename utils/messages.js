const moment = require("moment")

const getMessageFormatted = (username, text) => {
  return {
    username,
    text,
    time: moment().format("h:mm A"),
  }
}

module.exports = getMessageFormatted
