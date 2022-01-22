import {UsersRepository} from '../typeorm/repositories/UsersRepository'
import {getCustomRepository} from 'typeorm'
import path from 'path'
import uploadConfig from '../../../config/upload'
import fs from 'fs'



class UpdateUserAvatarService {

	async execute(user_id: string, avatarFilename: string) {
		const usersRepository = getCustomRepository(UsersRepository)
		const user = await usersRepository.findById(user_id)
		if (!user) throw new Error('User not found')
		if (user.avatar) {
			const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
			const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)
			if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath)
		}
		user.avatar = avatarFilename
		await usersRepository.save(user)
		return user
	}
}

export {UpdateUserAvatarService}
