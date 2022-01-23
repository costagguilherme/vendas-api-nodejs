import { Router } from 'express'
import {celebrate, Joi, Segments} from 'celebrate'
import { isAuthenticated } from '../../middlewares/isAuthenticated'
const customerRouter = Router()


import {CustomerController} from '../../../../modules/costumers/controllers/CustomerController'
const customerController = new CustomerController()


// ==================== Products ===========================

customerRouter.get("/customers", isAuthenticated, customerController.index)


customerRouter.get("/customer/:id", isAuthenticated, celebrate({
	[Segments.PARAMS] : {
		id: Joi.string().uuid().required()
	}
}), customerController.show)


customerRouter.post("/customer", isAuthenticated, celebrate({
	[Segments.BODY]: {
		name: Joi.string().required(),
		email: Joi.string().email().required(),
	}
}), customerController.create)


customerRouter.put("/customer/:id", isAuthenticated, celebrate({
	[Segments.PARAMS] : {
		id: Joi.string().uuid().required()

	},
	[Segments.BODY]: {
		name: Joi.string().required(),
		email: Joi.string().email().required(),


	}
}), customerController.update)

customerRouter.delete("/customer/:id", isAuthenticated, celebrate({
	[Segments.PARAMS] : {
		id: Joi.string().uuid().required()
	}
}), customerController.delete)







export default customerRouter
