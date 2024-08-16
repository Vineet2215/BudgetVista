import express from 'express'
import cors from 'cors'
import { readdirSync } from 'fs'
import db from './db/db.js'
import 'dotenv/config'
import userRouter from './routes/userRoutes.js'
import { errorHandler, notFound } from './middlewares/errorMiddlewares.js'
import { config } from 'dotenv'

const app = express()
const PORT = process.env.PORT

// Middlewares
app.use(express.json())
app.use(cors())

// Define an async function for dynamic imports
const importRouteModule = async (route) => {
    const routeModule = await import(`./routes/${route}`)
    return routeModule.default
}

// Routes

const routeFiles = readdirSync('./routes')

// Use a for...of loop for async operations to ensure they complete
const setupRoutes = async () => {
    for (const route of routeFiles) {
        const routeModule = await importRouteModule(route)
        app.use('/api/v1', routeModule)
    }

    app.use('/api/v1/users', userRouter)
    app.use(notFound)
    app.use(errorHandler)
}

// Start the server inside an async function
const startServer = async () => {
    try {
        await db()
        await setupRoutes()
        app.listen(PORT, () => {
            console.log('Listening to port:', PORT)
            // console.log('http://localhost:5000/api/v1/get-incomes')
            
        })
    } catch (error) {
        console.error('Error starting the server:', error)
    }
}

startServer()
