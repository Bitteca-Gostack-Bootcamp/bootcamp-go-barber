import AppointmentRepository from '../repositories/AppointmentRepositories'
import CreateAppointmentService from '../services/CreateAppointmentService'
import { getCustomRepository } from 'typeorm'

import { Router } from 'express'
import { parseISO } from 'date-fns'

const appointmentsRouter = Router()

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository)
  const appointments = await appointmentsRepository.find()
  return res.json(appointments)
})

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { provider_id, date } = req.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    })

    return res.json(appointment)
  } catch (error) {
    return res.status(400).json({ Error: error.message })
  }
})

export default appointmentsRouter
