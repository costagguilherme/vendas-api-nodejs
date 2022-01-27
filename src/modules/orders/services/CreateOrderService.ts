import { getCustomRepository } from 'typeorm'
import {OrdersRepository} from '../typeorm/repositories/OrdersRepository'
import {CustomersRepository} from '../../costumers/typeorm/repositories/CustomersRepository'
import ProductsRepository from '../../products/typeorm/repositories/ProductsRepository'
import { Customer } from '@modules/costumers/typeorm/entities/Customer'


interface IProduct {
	id: string;
	quantity: number;
}
interface IRequest {
	customer_id: string,
	products: IProduct[]
}

class CreateOrderService {

	async execute({customer_id, products}: IRequest) {
		const ordersRepository = getCustomRepository(OrdersRepository)
		const customerRepository = getCustomRepository(CustomersRepository)
		const productRepository = getCustomRepository(ProductsRepository)

		const customerExists = await customerRepository.findById(customer_id)
		const productsExists = await productRepository.findAllByIds(products)
		if (!productsExists.length) throw new Error('Some product/products do not exists')

		const existsProductsIds = productsExists.map((product) => product.id)

		const checkInexistentProducts = products.filter(product => !existsProductsIds.includes(product.id))

		if (checkInexistentProducts.length) throw new Error('Some product/products do not exists')

		const quantityAvailable = products.filter(product => productsExists.filter(p => p.id === product.id)[0].quantity < product.quantity)

		if (quantityAvailable.length) throw new Error('The quantity is not available')

		const serializedProducts = products.map(product => ({
			product_id: product.id,
			quantity: product.quantity,
			price: productsExists.filter(p => p.id == product.id)[0].price
		}))

		const order = await ordersRepository.createOrder({
			customer: customerExists as Customer,
			products: serializedProducts
		})

		const {order_products} = order

		const updatedProductQuantity = order_products.map(product => ({
			id: product.product_id,
			quantity: productsExists.filter(p => p.id === product.product_id)[0].quantity - product.quantity
		}))

		await productRepository.save(updatedProductQuantity)

		return order

	}
}

export {CreateOrderService }
