import {CreateUserService} from '../services/CreateUserService'
import {ListUserService} from '../services/ListUserService'
import {Request, Response} from 'express'
import { instanceToInstance } from 'class-transformer'


class UsersController {
	async index (req: Request, res: Response) {
		try {
			const listUserService = new ListUserService()
			const users = await listUserService.execute()
			return res.status(200).json(instanceToInstance(users))
		} catch (error) {
			return res.status(400).send("An error ocurred while listing users")
		}
	}

	async create (req: Request, res: Response) {
		try {
			const {name, email, password} = req.body
			const createUserService = new CreateUserService()
			const users = await createUserService.execute({name, email, password})
			return res.status(200).json(instanceToInstance(users))
		}

		catch (error) {
			return res.status(400).send("An error ocurred while creating user")
		}
	}
}

export {UsersController}
