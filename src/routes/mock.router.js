import { Router } from 'express'
import { mockingProductsController } from '../controllers/mock.controller.js'

const router = Router()

router.get('/', mockingProductsController)

export default router