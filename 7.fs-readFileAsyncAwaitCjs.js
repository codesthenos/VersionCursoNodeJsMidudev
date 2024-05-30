const fs = require('node:fs/promises')

;(async () => {
  try {
    console.log('Leyendo el primer archivo...')

    const text = await fs.readFile('./archivo.txt', 'utf-8')

    console.log('Texto del archivo.txt', text)

    console.log('Hacer cosas mientras lee el archivo...')

    console.log('Leyendo el segundo archivo...')

    const secondText = await fs.readFile('./archivo2.txt', 'utf-8')

    console.log('Texto del archivo2.txt', secondText)
  } catch (err) {
    console.error('Error leyendo archivo:', err)
  }
})()

async function readFiles () {
  try {
    console.log('Leyendo el primer archivo...')

    const text = await fs.readFile('./archivo.txt', 'utf-8')

    console.log('Texto del archivo.txt', text)

    console.log('Hacer cosas mientras lee el archivo...')

    console.log('Leyendo el segundo archivo...')

    const secondText = await fs.readFile('./archivo2.txt', 'utf-8')

    console.log('Texto del archivo2.txt', secondText)
  } catch (err) {
    console.error('Error leyendo archivo:', err)
  }
}

readFiles()
