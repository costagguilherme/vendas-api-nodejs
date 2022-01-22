import {UsersRepository} from '../typeorm/repositories/UsersRepository'
import {getCustomRepository} from 'typeorm'


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
		const user = usersRepository.create({name: name, email: email, password: password})
		await usersRepository.save(user)
		return user
	}
}

export {CreateUserService}
