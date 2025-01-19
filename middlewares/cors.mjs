import cors from 'cors'
// métodos normales: GET/HEAD/POST
// métodos complejos: PUT/PATCH/DELETE estos ocupan que se indiquen como opciones para que se ejecuten

//origenes permitidos por default
const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'http://127.0.0.1:5500',
  'https://movies.com',
  'https://midu.dev'
]


export const corsMiddleware =  ({ aceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  
  origin: (origin, callback) => {

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})