import 'reflect-metadata'

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import routes from './routes'
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'
import cors from 'cors'

import '@shared/infra/typeorm'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'Error', message: err.message })
  }

  console.error(err)

  return res
    .status(500)
    .json({ status: 'Error', message: 'Internal Server Error' })
})

app.listen(3333, () => {
  console.log('Server Started')
})
