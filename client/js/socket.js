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

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>')
    var a = jQuery('<a target="_blank">My current location</a>')

    li.text(`${message.from}: `)
    a.attr('href', message.url)
    li.append(a)
    jQuery('#messages').append(li)
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

jQuery('#send-location').on('click', function () {
    if (!navigator.geolocation) {
        return alert(' Geolocation not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position)
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        },function(res) {

        })
    }, function () {
        alert('Unable to fetch location.')
    })
})