import { Request, Response } from 'express'
import {CreateOrderService} from '../services/CreateOrderService'
import {ShowOrderService} from '../services/ShowOrderService'


class OrdersController {

	async show (req: Request, res: Response) {
		try {
			const {id} = req.params
			const showOrderService = new ShowOrderService()
			const order = await showOrderService.execute({id})
			return res.status(200).json(order)
		} catch (error) {
			return res.status(400).json({message: "An error occurred while showing order"})
		}
	}


	async create (req: Request, res: Response) {
		try {
			const {customer_id, products} = req.body
			const createOrder = new CreateOrderService()
			const order = await createOrder.execute({customer_id, products})
			return res.status(200).json(order)

			return res.status(200).json(products)
		} catch (error) {
			return res.status(400).json({message: "An error occurred while creating order"})
		}
	}

}

export {OrdersController}
