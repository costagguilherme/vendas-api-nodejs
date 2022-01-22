import {UserTokensRepository} from '../typeorm/repositories/UserTokensRepository'
import {getCustomRepository} from 'typeorm'
import { UsersRepository } from '../typeorm/repositories/UsersRepository'

// Send token for change password
class SendForgotPasswordEmailService {

	async execute(email: string) {
		const usersTokenRepository = getCustomRepository(UserTokensRepository)
		const usersRepository = getCustomRepository(UsersRepository)
		const user = await usersRepository.findByEmail(email)
		if (!user) throw new Error('User not found')
		const userToken = await usersTokenRepository.generate(user.id)
		console.log(userToken)
		return userToken
	}
}

export {SendForgotPasswordEmailService}
