const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const { generateMessage } = require('./utils/message')
const clientPath = path.join(__dirname, '../client')
const port = process.env.PORT || 3000
var app = express()
var server = http.createServer(app)
var io = socketIO.listen(server)

app.use(express.static(clientPath))

io.on('connection', function (socket) {
    console.log('New User Connected')


    // Socket will send to all the clients
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
    // Socket will sne to all other clients except the newly created
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

    socket.on('createMessage', (message, callback) => {

        // Save to DB
        console.log('save to DB', message)

        io.emit('newMessage', generateMessage(message.from, message.text))

        callback(message)
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected')
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})