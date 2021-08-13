const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

//for reciever ringtone
var ringtone = new Audio('https://mobcup.net/d/ybrkm5s8/mp3');

//for connected/disconnected users ringtone
var ringtone_2 = new Audio('https://mobcup.net/d/wanr9km7/mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    if(position == 'left'){
        ringtone.play();
    }
    if(position == 'position'){
        ringtone_2.play();
    }
}


// message send..
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
});

// new user alert message..
const user_name =  prompt("Enter your name to join chatroom");
socket.emit('new-user-joined', user_name);
// user joined notification..
socket.on('user-joined', user_name =>{
    append(`" ${user_name} joined the chat "`, 'position')
});


// recieve messages..
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
});

// disconnect user
socket.on('left', user_name =>{
    append(`" ${user_name}: has left the chat "`, 'position')
});


