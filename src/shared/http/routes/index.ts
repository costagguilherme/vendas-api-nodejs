import { Router } from 'express'


import productsRouter from './products/products'
import usersRouter from './users/users'
import sessionsRouter from './users/session'
import passwordRouter from './users/password'
import profileRouter from './users/profile'



const router = Router()



router.use(productsRouter)
router.use(usersRouter)
router.use(sessionsRouter)
router.use(passwordRouter)
router.use(profileRouter)




export default router
