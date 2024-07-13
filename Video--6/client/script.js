import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'

// eslint-disable-next-line no-unused-vars
const socket = io()

const form = document.getElementById('form')
const input = document.getElementById('input')
const messages = document.getElementById('messages')

socket.on('chat message', (message) => {
  const item = `<li>${message}</li>`
  messages.insertAdjacentHTML('beforeend', item)
})

form.addEventListener('submit', (e) => {
  e.preventDefault()

  if (input.value) {
    socket.emit('chat message', input.value)
    input.value = ''
  }
})
