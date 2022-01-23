import { getCustomRepository } from 'typeorm'
import {CustomersRepository} from '../typeorm/repositories/CustomersRepository'


class DeleteCustomerService {
	async execute(id: string) {
		const customerRepository = getCustomRepository(CustomersRepository)
		const costumer = await customerRepository.findById(id)
		if (!costumer) throw new Error('Customer not found')
		await await customerRepository.delete({id: id})
		return costumer
	}
}

export {DeleteCustomerService}
