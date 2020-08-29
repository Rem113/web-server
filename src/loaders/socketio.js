const io = require("socket.io")

module.exports = (http) => {
    const server = io(http)
    server.on("connection", (socket) => {
        console.log("💬 New connection")
        socket.on('isManager', data => {
            console.log(data)
        })
    })
}
