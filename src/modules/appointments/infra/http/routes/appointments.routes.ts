import { getCustomRepository } from 'typeorm'
import { Router } from 'express'
import { parseISO } from 'date-fns'

import AppointmentRepository from '@modules/appointments/repositories/AppointmentRepositories'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.get('/', ensureAuthenticated, async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository)
  const appointments = await appointmentsRepository.find()
  return res.json(appointments)
})

appointmentsRouter.post('/', ensureAuthenticated, async (req, res) => {
  const { provider_id, date } = req.body

  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentService()

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  })

  return res.json(appointment)
})

export default appointmentsRouter
