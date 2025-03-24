import express from 'express'
import PORT from './config.js'
import routes from './serverRoutes/routes.js'

const app = express()

app.use(express.json())

app.use('/' , routes)

app.listen(PORT , () => {
    console.log(`The server is running at PORT : ${PORT}`)
})
