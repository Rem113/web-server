const http = require('http')
const io = require('socket.io')(3005)

module.exports = (app) => {
    io.on("connection", (socket) => {
        socket.emit('message', 'bouffon de ta mère');
    })
}