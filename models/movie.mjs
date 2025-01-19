import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const movies = require('../movies.json')
import { randomUUID } from 'node:crypto'

export class MovieModel {
  static async getAll ({ genre })  {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() == genre.toLowerCase())
      )
    }
    return movies
  }

  static async getById ({ id }) {
    const movie = movies.findIndex(movie => movie.id == id)
    return movie 
  }

  static async create (input) {
    // en base de datos
    const newMovie = {
      id: randomUUID(), // uuid v4
      ...input
    }
  
    movies.push(newMovie)

    return newMovie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) { return false }

    movies.splice(movieIndex, 1)
    return true
  }

  static async update ({ id, input }){
    const movieIndex = movies.findIndex(movie => movie.id == id)
    if (movieIndex == -1) return false

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }

    movies.splice(movieIndex, 1)
    
    return movies[movieIndex]
  }
}