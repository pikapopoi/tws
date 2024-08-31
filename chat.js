const socket = io();

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messages = document.getElementById('messages');
const usersList = document.getElementById('users');

// Handle sending messages
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        socket.emit('chatMessage', message);
        messageInput.value = '';
    }
});

// Display received messages
socket.on('message', message => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerText = message;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
});

// Display online users
socket.on('userList', users => {
    usersList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.innerText = user;
        usersList.appendChild(li);
    });
});
