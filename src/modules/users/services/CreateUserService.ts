import {UsersRepository} from '../typeorm/repositories/UsersRepository'
import {getCustomRepository} from 'typeorm'
import {hash} from 'bcryptjs'


interface IRequest {
	name: string,
	email: string,
	password: string
}

class CreateUserService {

	async execute({name, email, password}: IRequest) {
		const usersRepository = getCustomRepository(UsersRepository)
		const emailExists = await usersRepository.findByEmail(email)
		if (emailExists) throw new Error('Email already being used')
		const passwordHash = await hash(password, 8)
		const user = usersRepository.create({name: name, email: email, password: passwordHash})
		await usersRepository.save(user)
		return user
	}
}

export {CreateUserService}
