import { EntityRepository, Repository } from 'typeorm';
import {User} from '../entities/User'

@EntityRepository(User)
class UsersRepository extends Repository<User> {
	async findByName (name: string) {
		const user = this.findOne({where: {name: name}})
		return user
	}

	async findById (id: string) {
		const user = this.findOne({where: {id: id}})
		return user
	}

	async findByEmail (email: string) {
		const user = this.findOne({where: {email: email}})
		return user
	}
}

export {UsersRepository}
