import { Router } from 'express'
import {celebrate, Joi, Segments} from 'celebrate'
import { OrdersController } from '../../../../modules/orders/controllers/OrdersController'
import { isAuthenticated } from '../../middlewares/isAuthenticated'
const ordersRouter = Router()


const ordersController = new OrdersController()


ordersRouter.get("/order/:id", isAuthenticated, celebrate({
	[Segments.PARAMS] : {
		id: Joi.string().uuid().required()
	}
}), ordersController.show)


ordersRouter.post("/orders", isAuthenticated, celebrate({
	[Segments.BODY]: {
		customer_id: Joi.string().uuid().required(),
		products: Joi.required()

	}
}), ordersController.create)








export default ordersRouter
