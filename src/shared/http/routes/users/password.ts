import { Router } from 'express'
import {celebrate, Joi, Segments} from 'celebrate'
const passwordRouter = Router()


import {ForgotPasswordController} from '../../../../modules/users/controllers/ForgotPasswordController'

const forgotPasswordController = new ForgotPasswordController()

passwordRouter.post("/password/forgot", celebrate({
	[Segments.BODY]: {
		email: Joi.string().email().required()
	}
}), forgotPasswordController.create)



export default passwordRouter 