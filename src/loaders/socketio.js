const http = require('http')
const socketIO = require('socket.io')

module.exports = (app) => {
    const server = http.createServer(app)
    const io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('New client connected')
    })
}