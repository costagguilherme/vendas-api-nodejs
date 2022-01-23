import { getCustomRepository } from 'typeorm'
import {CustomersRepository} from '../typeorm/repositories/CustomersRepository'


class ShowCustomerService {
	async execute(id: string) {
		const customerRepository = getCustomRepository(CustomersRepository)
		const costumer = await customerRepository.findById(id)
		if (!costumer) throw new Error('Customer not found')
		return costumer
	}
}

export {ShowCustomerService}
