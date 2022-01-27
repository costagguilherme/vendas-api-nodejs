import {Repository, EntityRepository, In} from 'typeorm'
import Product from '../entities/Product'


interface IFindProducts {
	id: string;
}

@EntityRepository(Product)
class ProductsRepository extends Repository<Product> {

	public async findByName (name: string): Promise<Product | undefined> {
		const product = await this.findOne({where: {name: name}})
		return product
	}

	public async findAllByIds (products: IFindProducts[]) {
		const productsId = products.map(product => product.id)
		const productsExists = await this.find({where: {id: In(productsId)}})
		return productsExists

	}
}

export default ProductsRepository

