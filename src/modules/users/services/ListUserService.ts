import {UsersRepository} from '../typeorm/repositories/UsersRepository'
import {getCustomRepository} from 'typeorm'

class ListUserService {

	async execute() {
		const usersRepository = getCustomRepository(UsersRepository)
		const users = await usersRepository.find()
		return users
	}
}

export {ListUserService}
