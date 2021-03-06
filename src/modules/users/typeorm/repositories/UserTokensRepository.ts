import { EntityRepository, Repository } from 'typeorm';
import { UserToken } from '../entities/UserToken';

@EntityRepository(UserToken)
class UserTokensRepository extends Repository<UserToken> {

	async findByToken (token: string) {
		const userToken = await this.findOne({where: {token: token}})
		return userToken
	}

	async generate (user_id: string) {
		const userToken = this.create({user_id: user_id})
		await this.save(userToken)
		return userToken
	}

}

export {UserTokensRepository}
