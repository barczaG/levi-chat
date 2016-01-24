/* global io, alert, $ */

var sendMessage
window.onload = function () {
  var messages = []
  var socket = io.connect('http://' + window.location.host)
  var field = document.getElementById('field')
  var sendButton = document.getElementById('send')
  var content = document.getElementById('content')
  var name = document.getElementById('name')

  socket.on('message', function (data) {
    if (data.message) {
      messages.push(data)
      var html = ''
      for (var i = 0; i < messages.length; i++) {
        html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>'
        html += messages[i].message + '<br />'
      }
      content.innerHTML = html
    } else {
      console.log('There is a problem:', data)
    }
  })

  socket.on('alert', function (data) {
    alert('Már legalább 1 perce vagy az oldalon!')
  })
  
  socket.on('alert2', function (data) {
    alert('Már legalább 5 perce vagy az oldalon!')
  })

  sendMessage = sendButton.onclick = function () {
    if (name.value === '') {
      alert('Please type your name!')
    } else {
      var text = field.value
      socket.emit('send', { message: text, username: name.value })
      field.value = ''
    }
  }
}
$(document).ready(function () {
  $('#field').keyup(function (e) {
    if (e.keyCode === 13) {
      sendMessage()
    }
  })
})
