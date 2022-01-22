import { getCustomRepository } from 'typeorm'
import ProductsRepository from '../typeorm/repositories/ProductsRepository'

interface IRequest {
	name: string,
	price: number,
	quantity: number
}

class CreateProductService {

	async execute({name, price, quantity}: IRequest) {
		const productsRepository = getCustomRepository(ProductsRepository)
		const productExists = await productsRepository.findByName(name)
		if (productExists) throw new Error('There is already one product with this name')
		const product = productsRepository.create({
			name,
			price,
			quantity
		})

		await productsRepository.save(product)
		return product
	}
}

export {CreateProductService}
