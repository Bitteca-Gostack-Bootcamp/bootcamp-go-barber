import { Router } from 'express'

import CreateUserService from '../services/CreateUserService'

const usersRouter = Router()

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body

    const CreateUser = new CreateUserService()

    const user = await CreateUser.execute({
      name,
      email,
      password,
    })

    delete user.password

    return res.json(user)
  } catch (error) {
    return res.status(400).json({ Error: error.message })
  }
})

export default usersRouter
