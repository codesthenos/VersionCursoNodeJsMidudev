import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
const uri = 'SECRET'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

async function connect () {
  try {
    await client.connect()
    const database = client.db('database')
    return database.collection('movies')
  } catch (error) {
    console.error('Error connecting to the database')
    console.error(error)
    await client.close()
  }
}

export class MovieModel {
  static async getAll ({ director, rate }) {
    const db = await connect()
    if (director) {
      const moviesByDirector = await db.find({
        director: {
          $elemMatch: {
            $regex: director,
            $options: 'i'
          }
        }
      }).toArray()
      if (moviesByDirector.length > 0) {
        if (rate) {
          const moviesByDirectorAndRate = await db.find({
            rate: {
              $elemMatch: {
                $gte: rate
              }
            }
          }).toArray()
          if (moviesByDirectorAndRate.length > 0) return moviesByDirectorAndRate
        }
        return moviesByDirector
      }
    }

    if (rate && rate > 0 && rate < 10) {
      const moviesByRate = await db.find({
        rate: {
          $elemMatch: {
            $gte: rate
          }
        }
      }).toArray()

      if (moviesByRate.length > 0) return moviesByRate
    }

    return db.find({}).toArray()
  }

  static async getById ({ id }) {
    const db = await connect()
    const objectId = ObjectId.createFromHexString(id)
    return db.findOne({ _id: objectId })
  }

  static async getByGenre ({ genre }) {
    const db = await connect()
    const movies = await db.find({
      genre: {
        $elemMatch: {
          $regex: genre,
          $options: 'i'
        }
      }
    }).toArray()

    return movies.length > 0 ? movies : false
  }

  static async create ({ input }) {
    const db = await connect()

    const { insertedId } = await db.insertOne(input)

    return {
      id: insertedId,
      ...input
    }
  }

  static async delete ({ id }) {
    const db = await connect()
    const objectId = ObjectId.createFromHexString(id)
    const { deletedCount } = await db.deleteOne({ _id: objectId })
    return deletedCount > 0
  }

  static async update ({ id, input }) {
    const db = await connect()
    const objectId = ObjectId.createFromHexString(id)

    const result = await db.findOneAndUpdate(
      { _id: objectId },
      { $set: input },
      { returnDocument: 'after' }
    )
    return result
  }
}
