import { EntityRepository, Repository } from 'typeorm';
import {Customer} from '../entities/Customer'

@EntityRepository(Customer)
class CustomersRepository extends Repository<Customer> {
	async findByName (name: string) {
		const customer = await this.findOne({where: {name: name}})
		return customer
	}

	async findById (id: string) {
		const customer = await this.findOne({where: {id: id}})
		return customer
	}

	async findByEmail (email: string) {
		const customer = await this.findOne({where: {email: email}})
		return customer
	}
}

export {CustomersRepository}
