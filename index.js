var express = require('express')
var app = express()
var port = 8888

app.set('views', __dirname + '/tpl')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {

  var message = req.query.message
  res.render('page', {
    welcomeMessage: message,
    dolgok: ['valami1', 'foo', 'bar']
  })
})

var io = require('socket.io').listen(app.listen(port))

io.sockets.on('connection', function (socket) {
  socket.emit('message', { message: 'welcome to the chat' })
  socket.on('send', function (data) {
    io.sockets.emit('message', data)
  })

  setTimeout(function () {
    socket.emit('alert')
  }, 10 * 1000)
})
console.log('Listening on port ' + port)
