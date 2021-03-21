const express = require('express')
const app = express()
app.use(express.static('public'))
const http = require('http').Server(app)
const serverSocket = require('socket.io')(http)
const porta = 8000

http.listen(porta, function () {
    console.log("servidor ok: http://localhost:" + porta)
})

app.get('/', function (req, resp) {
    resp.sendFile(__dirname + '/index.html')
})

serverSocket.on('connection', function (socket) {
    // console.log('Cliente conectado ' + socket.id)

    socket.on('chat-msg', function (msg) {
        console.log('msg> ' + msg.msg)
        serverSocket.emit('chat-msg', msg)
    })

    socket.on('status', function (msg) {
        console.log(msg.msg);
        
        socket.broadcast.emit('status', msg)
    })
})