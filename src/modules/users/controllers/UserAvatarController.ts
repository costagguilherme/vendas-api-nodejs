import { Request, Response } from 'express'
import {UpdateUserAvatarService} from '../services/UpdateUserAvatarService'
import { instanceToInstance } from 'class-transformer'

class UserAvatarController {

	async update (req: Request, res: Response) {
		try {
			const updateAvatar = new UpdateUserAvatarService()
			const user = await updateAvatar.execute(req.user.id, req.file?.filename as string)
			return res.status(200).json(instanceToInstance(user))
		} catch (error) {
			return res.status(400).send('An rror ocurred while updating avatar')
		}

	}

}

export {UserAvatarController}
