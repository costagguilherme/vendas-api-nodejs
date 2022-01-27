import { Customer } from '@modules/costumers/typeorm/entities/Customer'
import {Repository, EntityRepository} from 'typeorm'
import {Order} from '../entities/Order'


interface IProduct {
	product_id: string,
	price: number,
	quantity: number
}
interface IRequest {
	customer: Customer,
	products: IProduct[]
}

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {

	public async findById (id: string) {
		const order = await this.findOne(id, {
			relations: ['order_products', 'customer']
		})
		return order
	}

	public async createOrder ({customer, products}: IRequest) {
		const order = this.create({customer, order_products: products})
		await this.save(order)
		return order
	}
}

export {OrdersRepository}

