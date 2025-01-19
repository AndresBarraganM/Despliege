import { Router } from 'express'

import { MovieController } from '../controllers/movies.mjs'

export const MoviesRouter = Router()

MoviesRouter.get('/', MovieController.getAll)

MoviesRouter.get('/:id', MovieController.getById)

MoviesRouter.post('/', MovieController.create)

MoviesRouter.delete('/:id', MovieController.delete)

MoviesRouter.patch('/:id', MovieController.update)
