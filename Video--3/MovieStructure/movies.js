const z = require('zod') // Con esta dependencia vamos a validar la entrada de datos del POST

const movieStructure = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().min(1900).max(2050),
  director: z.string(),
  poster: z.string().url({
    message: 'poster must be a valid url'
  }),
  genre: z.array(z.enum(['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Romance', 'Sci-Fi', 'Slasher', 'Terror'])),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(11)
})

function validateNewMovie (newMovie) {
  return movieStructure.safeParse(newMovie)
}

module.exports = {
  validateNewMovie
}
