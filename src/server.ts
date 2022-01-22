import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import router from './shared/http/routes'
import './shared/typeorm/index'
import { errors } from 'celebrate'
import uploadConfig from '@config/upload'
const app = express()


app.use(cors())
app.use(express.json())
app.use("/files", express.static(uploadConfig.directory))
app.use(router)
app.use(errors())


app.listen(8080, () => {
	console.log('Server on 8080')
})



