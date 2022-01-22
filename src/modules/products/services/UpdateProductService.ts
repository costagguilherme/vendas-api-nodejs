import { getCustomRepository } from 'typeorm'
import ProductsRepository from '../typeorm/repositories/ProductsRepository'
import Product from '../typeorm/entities/Product'

interface IRequest {
	id: string,
	name: string,
	price: number,
	quantity: number
}

class UpdateProductService {

	async execute({id, name, price, quantity}: IRequest): Promise<Product> {
		const productsRepository = getCustomRepository(ProductsRepository)
		const product = await productsRepository.findOne({id: id})
		if (!product) throw new Error('Product not found')

		const productExists = await productsRepository.findByName(name)
		if (productExists && name != product.name) throw new Error('There is already one product with this name')

		await productsRepository.update({id: id}, {name: name, price: price, quantity: quantity})
		return product
	}
}

export {UpdateProductService}
