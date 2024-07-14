import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'

const getUserName = async () => {
  // eslint-disable-next-line no-undef
  const username = sessionStorage.getItem('username')
  if (username) {
    console.log(`Username exists ${username}`)
    return username
  }

  const res = await fetch('https://random-data-api.com/api/users/random_user')
  const { username: randomUsername } = await res.json()

  // eslint-disable-next-line no-undef
  sessionStorage.setItem('username', randomUsername)
  return randomUsername
}

const socket = io({
  auth: {
    username: await getUserName(),
    serverOffset: 0
  }
})

const form = document.getElementById('form')
const input = document.getElementById('input')
const messages = document.getElementById('messages')

socket.on('chat message', (message, serverOffset, username) => {
  const item = `<li>
                <p><small>${username}: </small>${message}</p>
                </li>`
  messages.insertAdjacentHTML('beforeend', item)
  socket.auth.serverOffset = serverOffset
})

form.addEventListener('submit', (e) => {
  e.preventDefault()

  if (input.value) {
    socket.emit('chat message', input.value)
    input.value = ''
  }
})
