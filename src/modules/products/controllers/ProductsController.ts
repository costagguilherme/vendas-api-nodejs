import {CreateProductService} from '../services/CreateProductService'
import {ShowProductService} from '../services/ShowProductService'
import {DeleteProductService} from '../services/DeleteProductService'
import {UpdateProductService} from '../services/UpdateProductService'
import {ListProductService} from '../services/ListProductService'
import { Request, Response } from 'express'


class ProductsController {

	async index (req: Request, res: Response) {
		try {
			const listProductService = new ListProductService()
			const products = await listProductService.execute()
			return res.status(200).json(products)
		} catch (error) {
			return res.status(400).json({message: "An error occurred while listing products"})
		}
	}

	async show (req: Request, res: Response) {
		try {
			const {id} = req.params
			const showProductService = new ShowProductService()
			const product = await showProductService.execute(id)
			return res.status(200).json(product)
		} catch (error) {
			return res.status(400).json({message: "An error occurred while showing product"})
		}
	}

	async create (req: Request, res: Response) {
		try {
			const {name, price, quantity} = req.body
			const createProductService = new CreateProductService()
			const product = await createProductService.execute({name, price, quantity})
			return res.status(200).json(product)
		} catch (error) {
			return res.status(400).json({message: "An error occurred while creating product"})
		}

	}


	async delete (req: Request, res: Response) {
		try{
			const { id } = req.params
			const deleteProductService = new DeleteProductService()
			const product = await deleteProductService.execute(id)
			return res.status(200).send(`The product with id ${product.id} has been deleted`)
		} catch (error) {
			return res.status(400).json({message: "An error occurred while deleting product"})
		}

	}

	async update (req: Request, res: Response) {
		try {
			const {name, price, quantity} = req.body
			const {id} = req.params
			const updateProductService = new UpdateProductService()
			const product = await updateProductService.execute({id, name, price, quantity})
			return res.status(200).send(`The product with id ${product.id} has been updated`)
		} catch (error) {
			return res.status(400).json({message: "An error occurred while updating product"})
		}

	}
}

export {ProductsController}
