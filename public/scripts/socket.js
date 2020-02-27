// Socket
const socket = io.connect('http://localhost:4000');

// Query DOM
const message = document.getElementById('message'),
  handle = document.getElementById('handle'),
  send = document.getElementById('send'),
  output = document.getElementById('output'),
  feedback = document.getElementById('feedback');

// Emit event
send.addEventListener('click', () => {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
  message.value = handle.value = '';
});

message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
});

// Listen for events
// Listen for chat
socket.on('chat', data => {
  feedback.innerHTML = '';
  let p = document.createElement('p');
  let strong = document.createElement('strong');
  strong.textContent = data.handle;
  p.appendChild(strong);
  p.append(`: ${data.message}`);
  output.appendChild(p);
});

// Listen for typing
socket.on('typing', data => {
  feedback.innerHTML = '';
  feedback.innerHTML += `<p><em>${data} is typing...</em></p>`;
});
