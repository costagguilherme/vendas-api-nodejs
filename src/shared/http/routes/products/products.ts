import { Router } from 'express'
import {celebrate, Joi, Segments} from 'celebrate'
//import { isAuthenticated } from '../../middlewares/isAuthenticated'
const productsRouter = Router()


import {ProductsController} from '../../../../modules/products/controllers/ProductsController'
const productsController = new ProductsController()


// ==================== Products ===========================

productsRouter.get("/products", productsController.index)


productsRouter.get("/product/:id", celebrate({
	[Segments.PARAMS] : {
		id: Joi.string().uuid().required()
	}
}), productsController.show)


productsRouter.post("/product",celebrate({
	[Segments.BODY]: {
		name: Joi.string().required(),
		price: Joi.number().precision(2).required(),
		quantity: Joi.number().required()
	}
}), productsController.create)


productsRouter.put("/product/:id",celebrate({
	[Segments.PARAMS] : {
		id: Joi.string().uuid().required()

	},
	[Segments.BODY]: {
		name: Joi.string().required(),
		price: Joi.number().precision(2).required(),
		quantity: Joi.number().required()

	}
}), productsController.update)


productsRouter.delete("/product/:id", celebrate({
	[Segments.PARAMS] : {
		id: Joi.string().uuid().required()
	}
}), productsController.delete)







export default productsRouter
