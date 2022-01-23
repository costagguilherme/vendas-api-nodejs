import {UserTokensRepository} from '../typeorm/repositories/UserTokensRepository'
import {getCustomRepository} from 'typeorm'
import { UsersRepository } from '../typeorm/repositories/UsersRepository'
import {EtherealMail} from '../../../config/mail/EtherealMail'
import path from 'path'

// Send token for change password
class SendForgotPasswordEmailService {

	async execute(email: string) {
		const usersTokenRepository = getCustomRepository(UserTokensRepository)
		const usersRepository = getCustomRepository(UsersRepository)
		const user = await usersRepository.findByEmail(email)
		if (!user) throw new Error('User not found')
		const userToken = await usersTokenRepository.generate(user.id)
		const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')
		await EtherealMail.sendMail({
			to: {
				name: user.name,
				email: user.email
			},
			from: {
				name: 'Equipe API Vendas',
				email: 'equipe@apivendas.com'
			},
			subject: '[API Vendas] Redefinição de senha',
			templateData: {
				file: forgotPasswordTemplate,
				variables: {
					name: user.name,
					link: `http://localhost:3000/reset_password?token=${userToken.token}`
				}
			}
		})

		return userToken
	}
}

export {SendForgotPasswordEmailService}
