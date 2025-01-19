import { Router } from 'express'
import { validateMovie, validatePartialMovie } from '../schemas/movies.mjs'
import { MovieModel } from '../models/movie.mjs'

/*
Formas de importar un json

import movies from './movies.json' with { type: 'json' } 
  experimentado por lo tanto no oficial y la sintaxis puede cambiar


import fs from 'node:fs'
const movies = JSON.parse(fs.readFileSync('./movies.json','utf-8'))
  otra forma de importar un json pero requiere importar fs
*/
//forma recomendada de importar un json por ahora
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const movies = require('../movies.json')


export const MoviesRouter = Router()

MoviesRouter.get('/', async (req, res) => {
  const { genre } = req.query

  const movies = await MovieModel.getAll({ genre })

  res.json(movies)
})

MoviesRouter.get('/:id', async (req,res) => {
  const { id } = req.params
  const movie = await MovieModel.getById({ id })
  if (movie) return res.json(movie)
  res.status(404).json({message: 'Movie not found'})
})

MoviesRouter.post('/', async (req, res) => {
    const result = validateMovie(req.body)
  
    if (!result.success) {
      // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create(result.data)
  
    res.status(201).json(newMovie)
})

MoviesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  const result = await MovieModel.delete({ id })

  if (result == false) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  return res.json({ message: 'Movie deleted' })
})

MoviesRouter.patch('/:id', async(req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const updateMovie = await MovieModel.update({ id, input: result.data})

  return res.json(updateMovie)
})

