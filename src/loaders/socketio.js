const io = require("socket.io")

module.exports = (http) => {
  io(http).on("connection", () => console.log("New connection"))
}
