import { getCustomRepository } from 'typeorm'
import {OrdersRepository} from '../typeorm/repositories/OrdersRepository'



interface IRequest {
	id: string
}

class ShowOrderService {

	async execute({id}: IRequest) {
		const ordersRepository = getCustomRepository(OrdersRepository)
		const order = await ordersRepository.findById(id)
		if (!order) throw new Error('Order not found')
		return order
	}
}

export {ShowOrderService}
