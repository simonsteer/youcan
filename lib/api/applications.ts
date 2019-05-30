import { Router } from 'express'
import Application from '../models/application'
import Recordable, { RecordableSchema } from '../models/recordable'
import Record, { RecordSchema } from '../models/record'
import { authentication, AuthenticationRequest } from '../middleware'
import RecordCreatorService from '../services/recordCreatorService'
import { ExtendedRequest } from './types'

const router = Router()

router.get(
  '/',
  authentication,
  async (req: AuthenticationRequest, res, next) => {
    try {
      const applications = await Application.find({
        user_id: req.token!.user.id,
      })
      res.status(200).json({ applications })
    } catch (e) {
      next(e)
    }
  }
)

router.post(
  '/',
  authentication,
  async (
    req: AuthenticationRequest & ExtendedRequest<any, { name: string }>,
    res,
    next
  ) => {
    const {
      body: { name },
      token,
    } = req
    const IApplication = new Application({ name, user_id: token!.user.id })

    try {
      const application = await IApplication.save()
      console.log({ application })
      res.status(201).json({ application })
    } catch (e) {
      next(e)
    }
  }
)

router.get(
  '/:application_id',
  async (req: ExtendedRequest<{ application_id: string }>, res, next) => {
    try {
      const { application_id } = req.params
      const application = await Application.findById(application_id)
      res.status(200).json({ application })
    } catch (e) {
      next(e)
    }
  }
)

router.get(
  '/:application_id/recordables',
  authentication,
  async (req: ExtendedRequest<{ application_id: string }>, res, next) => {
    const { application_id } = req.params

    try {
      const recordables = await Recordable.find({ application_id })
      if (!recordables) {
        next(new Error("Couldn't get application records"))
        return
      }

      res.status(200).json({ recordables })
    } catch (e) {
      next(e)
    }
  }
)

router.post(
  '/:application_id/recordables',
  authentication,
  async (
    req: AuthenticationRequest &
      ExtendedRequest<
        { application_id: string },
        {
          name: RecordableSchema['name']
          fields: RecordableSchema['fields']
        }
      >,
    res,
    next
  ) => {
    const { application_id } = req.params
    const { name, fields } = req.body

    // TODO: ADD recordableCreatorService which validates fields
    const IRecordable = new Recordable({
      application_id,
      name,
      fields,
    })

    try {
      const recordable = await IRecordable.save()
      res.status(201).json({ recordable })
    } catch (e) {
      next(e)
    }
  }
)

router.get(
  '/:application_id/records/:name',
  authentication,
  async (
    req: ExtendedRequest<{
      application_id: string
      name: string
    }>,
    res,
    next
  ) => {
    const { application_id, name } = req.params

    console.log({ application_id, name })
    try {
      const records = await Record.find({ application_id, name })
      console.log({ records })
      res.status(200).json({ records })
    } catch (e) {
      next(e)
    }
  }
)

router.post(
  '/:application_id/records/:name',
  authentication,
  async (
    req: ExtendedRequest<
      {
        application_id: string
        name: string
      },
      { data: RecordSchema['data'] }
    >,
    res,
    next
  ) => {
    const {
      params: { application_id, name },
      body: data,
    } = req

    try {
      const recordable = await Recordable.findOne({ application_id, name })
      if (!recordable) {
        next(new Error(`Unable to find ${name} record`))
        return
      }

      const recordCreator = new RecordCreatorService(recordable, data)
      const result = recordCreator.process()
      console.log(result)

      if (result === null) {
        next(`An error occurred when creating ${recordable.name}`)
      } else if (result instanceof Error) {
        next(result)
      } else {
        const record = await result.save()
        res.status(201).json({ record })
      }
    } catch (e) {
      next(e)
    }
  }
)

export default router
