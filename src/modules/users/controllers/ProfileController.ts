
import {Request, Response} from 'express'
import { ShowProfileService } from '../services/ShowProfileService'
import { UpdateProfileService } from '../services/UpdateProfileService'


class ProfileController {
	async show (req: Request, res: Response) {
		try {
			const user_id = req.user.id
			const showProfile = new ShowProfileService()
			const user = await showProfile.execute(user_id)
			return res.status(200).json(user)
		} catch (error) {
			return res.status(400).send("An error ocurred while showing profile user")
		}
	}

	async update (req: Request, res: Response) {
		try {
			const user_id = req.user.id
			const {name, email, new_password, old_password} = req.body
			const updateProfile = new UpdateProfileService()
			await updateProfile.execute({user_id, name, email, new_password, old_password})
			return res.status(200).send(`The user with id ${user_id} has been updated`)
		}

		catch (error) {
			return res.status(400).send("An error ocurred while updating profile user")
		}
	}
}

export {ProfileController}
