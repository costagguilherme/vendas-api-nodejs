import {CreateCustomerService} from '../services/CreateCustomerService'
import {ListCostumerService} from '../services/ListCustomerService'
import {ShowCustomerService} from '../services/ShowCustomerService'
import {UpdateCustomerService} from '../services/UpdateCustomerService'
import {DeleteCustomerService} from '../services/DeleteCustomerService'
import {Request, Response} from 'express'


class CustomerController {
	async index (req: Request, res: Response) {
		try {
			const listCostumerService = new ListCostumerService()
			const customers = await listCostumerService.execute()
			return res.status(200).json(customers)
		} catch (error) {
			return res.status(400).send("An error ocurred while listing customers")
		}
	}

	async show (req: Request, res: Response) {
		try {
			const {id} = req.params
			const showCustomerService = new ShowCustomerService()
			const customer = await showCustomerService.execute(id)
			return res.status(200).json(customer)
		} catch (error) {
			return res.status(400).json({message: "An error occurred while showing customer"})
		}
	}

	async create (req: Request, res: Response) {
		try {
			const {name, email} = req.body
			const createCustomerService = new CreateCustomerService()
			const customer = await createCustomerService.execute({name, email})
			return res.status(200).json(customer)
		}

		catch (error) {
			return res.status(400).send("An error ocurred while creating customer")
		}
	}

	async delete (req: Request, res: Response) {
		try{
			const { id } = req.params
			const deleteCustomerService = new DeleteCustomerService()
			const customer = await deleteCustomerService.execute(id)
			return res.status(200).send(`The customer with id ${customer.id} has been deleted`)
		} catch (error) {
			return res.status(400).json({message: "An error occurred while deleting customer"})
		}

	}

	async update (req: Request, res: Response) {
		try {
			const {name, email} = req.body
			const {id} = req.params
			const updateCustomerService = new UpdateCustomerService()
			const customer = await updateCustomerService.execute({id, name, email})
			return res.status(200).send(`The customer with id ${customer.id} has been updated`)
		} catch (error) {
			return res.status(400).json({message: "An error occurred while updating customer"})
		}

	}

}

export {CustomerController}
