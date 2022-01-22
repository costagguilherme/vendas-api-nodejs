import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import router from './routes'
import '@shared/typeorm/index'
import { errors } from 'celebrate'
const app = express()


app.use(cors())
app.use(express.json())
app.use(router)
app.use(errors())


app.listen(8080, () => {
	console.log('Server on 8080')
})



