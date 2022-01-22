import {UsersRepository} from '../typeorm/repositories/UsersRepository'
import {getCustomRepository} from 'typeorm'
import authConfig from '../../../config/auth'
import {compare} from 'bcryptjs'
import {sign} from 'jsonwebtoken'

interface IRequest {
	email: string,
	password: string
}


class CreateSessionService {
	async execute({email, password}: IRequest) {
		const usersRepository = getCustomRepository(UsersRepository)
		const user = await usersRepository.findByEmail(email)
		if (!user) throw new Error('Invalid credencials')
		const passwordConfirmed = await compare(password, user['password'])
		if (!passwordConfirmed) throw new Error('Invalid credencials')
		const token = sign({}, authConfig.jwt['secret'], {
			subject: user.id,
			expiresIn: authConfig.jwt['expiresIn']
		})
		return {user, token}
	}
}

export {CreateSessionService}
