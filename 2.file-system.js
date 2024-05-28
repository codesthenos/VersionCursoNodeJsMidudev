const fs = require('node:fs')

const stats = fs.statSync('./archivo.txt')

console.log(
  'Es un archivo?', stats.isFile(),
  'Es una carpeta?',stats.isDirectory(),
  'Es un link simbolico?',stats.isSymbolicLink(),
  'Tamaño', stats.size
)