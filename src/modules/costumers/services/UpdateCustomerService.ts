import {CustomersRepository} from '../typeorm/repositories/CustomersRepository'
import {getCustomRepository} from 'typeorm'


interface IRequest {
	id: string,
	name: string,
	email: string
}

class UpdateCustomerService {

	async execute({id, name, email}: IRequest) {
		const customersRepository = getCustomRepository(CustomersRepository)
		const customer = await customersRepository.findById(id)
		if (!customer) throw new Error('Customer not found')
		const customerEmailExists = await customersRepository.findByEmail(email)
		if (customerEmailExists && email != customer.email) throw new Error('There is already one customer with this email')
		await customersRepository.update({id: id}, {name: name, email: email})
		return customer

	}

}

export {UpdateCustomerService}
