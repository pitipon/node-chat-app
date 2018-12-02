var socket = io();

socket.on('connect', function() {
    console.log('Connected to Server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from Server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message)

    var li = jQuery('<li></li>')
    li.text(`${message.from}: ${message.text}`)

    jQuery('#messages').append(li)
})


socket.emit('createMessage', {
    from: 'client',
    text: 'hi'
}, function (res) {
    console.log('SERVER RES', res)
})

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault()
    console.log('click', jQuery('[name=message]').val())
    let inputMessage = jQuery('[name=message]').val()

    socket.emit('createMessage', {
        from: 'client',
        text: inputMessage
    }, function (res) {
        console.log('SERVER RES', res)
    })
}) 