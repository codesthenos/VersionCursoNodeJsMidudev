import { readFile } from 'node:fs/promises'

Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8')
]).then(([text, secondText]) => {
  console.log('Leyendo el primer archivo...'),
  console.log('Leyendo el segundo archivo...'),
  console.log('Texto del archivo.txt', text),
  console.log('Texto entre logs de archivos'),
  console.log('Texto del archivo2.txt', secondText),
  console.log('Texto al final del todo')
})