import { Router } from 'express'
import {celebrate, Joi, Segments} from 'celebrate'
import { isAuthenticated } from '../../middlewares/isAuthenticated'
import multer from 'multer'
import uploadConfig from '../../../../config/upload'

const usersRouter = Router()


import {UsersController} from '../../../../modules/users/controllers/UsersController'
import {UserAvatarController} from '../../../../modules/users/controllers/UserAvatarController'

const usersController = new UsersController()
const usersAvatarController = new UserAvatarController()

const upload = multer(uploadConfig)

usersRouter.get("/users", isAuthenticated, usersController.index)

usersRouter.post("/user",  celebrate({
	[Segments.BODY] : {
		name: Joi.string().required(),
		email: Joi.string().required(),
		password: Joi.string().required()
	}
}),usersController.create)

usersRouter.patch("/user/avatar", isAuthenticated, upload.single('avatar'), usersAvatarController.update)

export default usersRouter