window.onload = function() {
  let messages = []
  const socket = io.connect('http://localhost:3700')
  const field = document.getElementById('field')
  const sendButton = document.getElementById('send')
  const content = document.getElementById('content')
  const name = document.getElementById('name')

  socket.on('message', function(data) {
    if (data.message) {
      messages.push(data)
      let html = ''
      for (var i = 0; i < messages.length; i++) {
        html +=
          '<b>' +
          (messages[i].username ? messages[i].username : 'Server') +
          ': </b>'
        html += messages[i].message + '<br />'
      }
      content.innerHTML = html
      content.scrollTop = content.scrollHeight
    } else {
      console.log('There is a problem:', data)
    }
  })

  sendButton.onclick = function() {
    if (name.value == '') {
      alert('Please type your name!')
    } else {
      const text = field.value
      socket.emit('send', { message: text, username: name.value })
      field.value = ''
    }
  }

  field.addEventListener('keypress', function(e) {
    const key = e.which || e.keyCode
    if (key === 13) {
      sendButton.onclick()
    }
  })
}
