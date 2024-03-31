import { Router } from 'express'
import { getAllBarang, insertBarang } from '../controllers/barang.controller'
import expressAsyncHandler from 'express-async-handler'
const barangRouter = Router()

barangRouter.get('/barang', expressAsyncHandler(getAllBarang))
barangRouter.post('/barang', insertBarang)

export default barangRouter
