import { Router } from 'express'
import {ProductsController} from '../../../modules/products/controllers/ProductsController'
import {celebrate, Joi, Segments} from 'celebrate'
const router = Router()
const productsController = new ProductsController()

router.get("/products", productsController.index)


router.get("/product/:id", celebrate({
	[Segments.PARAMS] : {
		id: Joi.string().uuid().required()
	}
}), productsController.show)


router.post("/product",celebrate({
	[Segments.BODY]: {
		name: Joi.string().required(),
		price: Joi.number().precision(2).required(),
		quantity: Joi.number().required()
	}
}), productsController.create)


router.put("/product/:id",celebrate({
	[Segments.PARAMS] : {
		id: Joi.string().uuid().required()

	},
	[Segments.BODY]: {
		name: Joi.string().required(),
		price: Joi.number().precision(2).required(),
		quantity: Joi.number().required()

	}
}), productsController.update)


router.delete("/product/:id", celebrate({
	[Segments.PARAMS] : {
		id: Joi.string().uuid().required()
	}
}), productsController.delete)


export default router
