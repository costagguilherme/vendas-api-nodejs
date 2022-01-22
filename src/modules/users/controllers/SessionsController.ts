import {Request, Response} from 'express'
import { CreateSessionService } from '../services/CreateSessionService'

class SessionsController {
	async create(req: Request, res: Response) {
		try{
			const {email, password} = req.body
			const createSessionService = new CreateSessionService()
			const user = await createSessionService.execute({email, password})
			return res.status(200).json(user)
		} catch (error) {
			return res.status(401).send('An error ocurred in authentication')
		}
		

	}
}

export {SessionsController}