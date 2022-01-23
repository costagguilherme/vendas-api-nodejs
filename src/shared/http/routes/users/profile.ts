import { Router } from 'express'
import {celebrate, Joi, Segments} from 'celebrate'
import { isAuthenticated } from '../../middlewares/isAuthenticated'
import { ProfileController } from '@modules/users/controllers/ProfileController'


const profileRouter = Router()


const profileController = new ProfileController()

profileRouter.get("/profile", isAuthenticated, profileController.show)

profileRouter.put("/profile", isAuthenticated, celebrate({
	[Segments.BODY] : {
		name: Joi.string().required(),
		email: Joi.string().required(),
		new_password: Joi.string().optional(),
		old_password: Joi.string(),
		old_password_confirmation: Joi.string()
		.valid(Joi.ref('old_password'))
		.when('old_password', {
			is: Joi.exist(),
			then: Joi.required()
		})
	}
}), profileController.update)


export default profileRouter
