import {UsersRepository} from '../typeorm/repositories/UsersRepository'
import {getCustomRepository} from 'typeorm'

class ShowProfileService {

	async execute(user_id: string) {
		const usersRepository = getCustomRepository(UsersRepository)
		const user = await usersRepository.findById(user_id)
		if (!user) throw new Error('User not found')
		return user
	}
}

export {ShowProfileService}
