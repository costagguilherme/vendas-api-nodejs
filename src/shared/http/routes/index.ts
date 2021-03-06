import { Router } from 'express'


import productsRouter from './products/products'
import usersRouter from './users/users'
import sessionsRouter from './users/session'
import passwordRouter from './users/password'
import profileRouter from './users/profile'
import customerRouter from './customers/customer'
import ordersRouter from './orders/orders'



const router = Router()



router.use(productsRouter)
router.use(usersRouter)
router.use(sessionsRouter)
router.use(passwordRouter)
router.use(profileRouter)
router.use(customerRouter)
router.use(ordersRouter)




export default router
