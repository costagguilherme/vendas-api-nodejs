import { getCustomRepository } from 'typeorm'
import ProductsRepository from '../typeorm/repositories/ProductsRepository'
import Product from '../typeorm/entities/Product'


class ShowProductService {

	async execute(id: string): Promise<Product | undefined> {
		const productsRepository = getCustomRepository(ProductsRepository)
		const product = await productsRepository.findOne({id: id})
		if (!product) throw new Error('Product not found')
		return product
	}
}

export {ShowProductService}
