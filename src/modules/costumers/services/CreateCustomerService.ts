import { getCustomRepository } from 'typeorm'
import {CustomersRepository} from '../typeorm/repositories/CustomersRepository'


interface IRequest {
	name: string,
	email: string
}

class CreateCustomerService {

	async execute({name, email}: IRequest) {
		const customersRepository = getCustomRepository(CustomersRepository)
		const emailExists = await customersRepository.findByEmail(email)
		if (emailExists) throw new Error('Email already being used')
		const customer = customersRepository.create({name: name, email: email})
		await customersRepository.save(customer)
		return customer
	}
}

export {CreateCustomerService}
