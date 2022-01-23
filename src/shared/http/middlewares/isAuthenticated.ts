import { NextFunction, Response, Request } from "express";
import { verify } from 'jsonwebtoken'
import authConfig from '../../../config/auth'

interface ITokenPayload {
	iat: number
	exp: number
	sub: string

}
function isAuthenticated (req: Request, res: Response, next: NextFunction) {
	const auth = req.headers['authorization']
	if (!auth) return res.status(401).send('Token do not exists')
	const token = (auth.split(" "))[1]
	try {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const decoded = verify(token, authConfig.jwt['secret'])
		const {sub} = decoded as ITokenPayload
		req.user = {
			id: sub
		}
		next()

	} catch (error) {
		if (!auth) return res.status(401).send('Invalid token')
	}

}

export {isAuthenticated}
