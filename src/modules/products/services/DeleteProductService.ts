import { getCustomRepository } from 'typeorm'
import ProductsRepository from '../typeorm/repositories/ProductsRepository'
import Product from '../typeorm/entities/Product'


class DeleteProductService {
	async execute(id: string): Promise<Product> {
		const productsRepository = getCustomRepository(ProductsRepository)
		const product = await productsRepository.findOne({id: id})
		if (!product) throw new Error('Product not found')
		await productsRepository.delete({id: id})
		return product
	}
}

export {DeleteProductService}
