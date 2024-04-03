import { Router } from 'express'
import barangRouter from './barang.route'
import { notFound } from '../controllers/error.controller'
import userRoute from './user.route'

const app = Router()

// http://localhost:4000/api/barang
app.use('/api', barangRouter)
app.use('/api', userRoute)

app.use('*', notFound)
export default app
