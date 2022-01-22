import {UserTokensRepository} from '../typeorm/repositories/UserTokensRepository'
import {getCustomRepository} from 'typeorm'
import { UsersRepository } from '../typeorm/repositories/UsersRepository'
import {isAfter, addHours}  from 'date-fns'
import {hash} from 'bcryptjs'

interface IRequest {
	token: string,
	password: string
}


class ResetPasswordService {

	async execute({token, password}: IRequest) {
		const usersTokenRepository = getCustomRepository(UserTokensRepository)
		const usersRepository = getCustomRepository(UsersRepository)
		const userToken = await usersTokenRepository.findByToken(token)
		if (!userToken) throw new Error('User token does not exists')
		const user = await usersRepository.findById(userToken.user_id)
		if (!user) throw new Error('User does not exists')
		const tokenCreatedAt = userToken.created_at
		const compareDate = addHours(tokenCreatedAt, 2)
		if (isAfter(Date.now(), compareDate)) throw new Error('Token expired')
		const hashPassword = await hash(password, 8)
		user.password = hashPassword
	}
}

export {ResetPasswordService}
