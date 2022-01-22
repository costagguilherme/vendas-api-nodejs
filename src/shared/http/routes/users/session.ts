import { Router } from 'express'
import {celebrate, Joi, Segments} from 'celebrate'
const sessionsRouter = Router()


import {SessionsController} from '../../../../modules/users/controllers/SessionsController'

const usersController = new SessionsController()

sessionsRouter.post("/sessions", celebrate({
	[Segments.BODY]: {
		email: Joi.string().email().required(),
		password: Joi.string().required()
	}
}),usersController.create)



export default sessionsRouter