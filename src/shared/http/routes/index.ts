import { Router } from 'express'


import productsRouter from './products/products'
import usersRouter from './users/users'
import sessionsRouter from './users/session'
import passwordRouter from './users/password'



const router = Router()



router.use(productsRouter)
router.use(usersRouter)
router.use(sessionsRouter)
router.use(passwordRouter)




export default router
