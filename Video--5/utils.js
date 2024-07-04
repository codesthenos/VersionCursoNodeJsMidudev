// import moviesJSON from './movies.json' with { type: 'json' } --> FORMA DE IMPORTAR .json EN FUTURO PROXIMO

/* FORMA ACTUAL 1 IMPORTANDO fs Y METIENDO EN UNA CONSTANTE EL RESULTADO DEL PARSEO Y LECTURA DEL JSON
  import fs from 'node:fs'
  const moviesJSON = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))
*/

// CREANDO LA FUNCION 'require()' DE CommonJS Y UNA VEZ CREADA, IMPORTAR EL '.json' DIRECTAMENTE COMO HACIAMOS EN CommonJS
// IMPORTAMOS 'createRequire()' PARA PODER CREAR LA FUNCION require EN ESModules
import { createRequire } from 'node:module'

// CREAMOS LA FUNCION 'require()' USANDO 'import.meta.url' QUE NOS DEVUELVE LA DIRECCION DEL ARCHIVO EN EL QUE ESTAMOS
const require = createRequire(import.meta.url)

// NOS TRAEMOS EL '.json' COMO HACIAMOS CUANDO USABAMOS CommonJS REALMENTE CREAMOS UNA FUNCION PARA PODER USARLA DE FORMA GENERICA
export const readJSON = (path) => require(path)
