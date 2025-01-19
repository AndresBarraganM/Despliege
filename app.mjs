import express, { json } from 'express' // require -> commonJS
import { MoviesRouter } from './routes/movies.mjs'
import { corsMiddleware } from './middlewares/cors.mjs'

const app = express()
app.use(json())
app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

// Middleware para dar permisos cors
app.use(corsMiddleware())

// Todos los recursos que sean MOVIES se identifica con /movies
// MoviesRouter es activado si la ruta busca movies
app.use('/movies', MoviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})
