import { Request, Response } from 'express'
import {UpdateUserAvatarService} from '../services/UpdateUserAvatarService'

class UserAvatarController {

	async update (req: Request, res: Response) {
		const updateAvatar = new UpdateUserAvatarService()
		const user = await updateAvatar.execute(req.user.id, req.file?.filename as string)
		return res.status(200).json(user)
	}

}

export {UserAvatarController}