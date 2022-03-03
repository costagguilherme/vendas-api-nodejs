import { getCustomRepository } from 'typeorm'
import {CustomersRepository} from '../typeorm/repositories/CustomersRepository'


class ListCostumerService {
	async execute() {
		const customerRepository = getCustomRepository(CustomersRepository)
		const costumers = await customerRepository.createQueryBuilder().paginate()
		return costumers
	}
}

export {ListCostumerService}
