import { Request, Response } from 'express'
import {SendForgotPasswordEmailService} from '../services/SendForgotPasswordEmailService'

class ResetPasswordController {

	async create (req: Request, res: Response) {
		try {
			const {email} = req.body
			const sendForgotPasswordService = new SendForgotPasswordEmailService()
			const userToken = await sendForgotPasswordService.execute(email)
			return res.status(200).json(userToken)
		} catch (error) {
			return res.status(400).send('An error ocurred while changing password')
		}
		
	}

}

export {ResetPasswordController}