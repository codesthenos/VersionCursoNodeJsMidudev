const path = require('node:path')

console.log('Tipo de barra por defecto que usa mi sistema operativo\npara crear los paths de archivos y directorios:\n', path.sep)

const filePath = path.join('C:', 'Users', 'Guillermo Ruiz', 'Desktop', 'archivoCreadoConPath.txt')
console.log('Crear path crossplatform', filePath)

const base = path.basename(filePath)
console.log('Me dice el nombre del archivo de un path', base)

const baseNoExtension = path.basename(filePath, '.txt')
console.log('Nombre del archivo sin su extension', baseNoExtension)

const extension = path.extname(filePath)
console.log('Obtengo la extension', extension)
