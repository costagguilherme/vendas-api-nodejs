import {UsersRepository} from '../typeorm/repositories/UsersRepository'
import {getCustomRepository} from 'typeorm'
import {compare, hash} from 'bcryptjs'


interface IRequest {
	user_id: string,
	name: string,
	email: string,
	new_password?: string,
	old_password?: string
}

class UpdateProfileService {

	async execute({user_id, name, email, new_password, old_password}: IRequest) {
		const usersRepository = getCustomRepository(UsersRepository)
		const user = await usersRepository.findById(user_id)
		if (!user) throw new Error('User not found')
		const userUpdateEmail = await usersRepository.findByEmail(email)
		if (userUpdateEmail && userUpdateEmail.id != user.id) throw new Error('There is already one user with this email')
		if (new_password && !old_password) throw new Error('Old password is required')

		if (new_password && old_password) {
			const checkOldPassword = await compare(old_password, user.password)
			if (!checkOldPassword) throw new Error('Old password is different')
			user.password = await hash(new_password, 8)
		}

		await usersRepository.update({id: user_id}, {name: name, email: email, password: user.password})

	}

}

export {UpdateProfileService}
