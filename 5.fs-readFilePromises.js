const fs = require('node:fs/promises')

console.log('Leyendo el primer archivo...')

fs.readFile('./archivo.txt', 'utf-8')
  .then(text => {
    console.log('Texto del archivo.txt', text)
  })

console.log('Hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo...')
fs.readFile('./archivo2.txt', 'utf-8')
  .then(text => {
    console.log('Texto del archivo2.txt', text)
  })
