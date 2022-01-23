import { Request, Response } from 'express'
import {ResetPasswordService} from '../services/ResetPasswordService'
class ResetPasswordController {

	async create (req: Request, res: Response) {
		try {
			const {token, password} = req.body
			const resetPasswordService = new ResetPasswordService()
			await resetPasswordService.execute({token, password})
			return res.status(200).send('Password successfully changed')
		} catch (error) {
			return res.status(400).send('An error ocurred while changing password')
		}

	}

}

export {ResetPasswordController}
