import { Router } from 'express'
import Application from '../models/application'
import Moduleable, { ModuleableSchema } from '../models/moduleable'
import Module, { ModuleSchema } from '../models/module'
import { authentication } from '../middleware'
import ModuleCreatorService from '../services/moduleCreatorService'
import { ExtendedRequest } from './types'

const router = Router()

router.get('/:id', async (req: ExtendedRequest<{ id: string }>, res, next) => {
  try {
    const { id } = req.params
    const application = await Application.findById(id)
    res.status(200).json({ application })
  } catch (e) {
    next(e)
  }
})

router.get(
  '/:application_id/moduleables',
  authentication,
  async (req: ExtendedRequest<{ application_id: string }>, res, next) => {
    const { application_id } = req.params

    try {
      const moduleables = await Moduleable.find({ application_id })
      if (!moduleables) {
        next(new Error("Couldn't get application modules"))
        return
      }

      res.status(200).json({ moduleables })
    } catch (e) {
      next(e)
    }
  }
)

router.post(
  '/:application_id/moduleables',
  authentication,
  async (
    req: ExtendedRequest<
      { application_id: string },
      {
        name: ModuleableSchema['name']
        fields: ModuleableSchema['fields']
      }
    >,
    res,
    next
  ) => {
    const { application_id } = req.params
    const { name, fields } = req.body

    // TODO: ADD moduleableCreatorService which validates fields
    const IModuleable = new Moduleable({
      application_id,
      name,
      fields,
    })

    try {
      const moduleable = await IModuleable.save()
      res.status(201).json({ moduleable })
    } catch (e) {
      next(e)
    }
  }
)

router.get(
  '/:application_id/modules/:name',
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

    try {
      const modules = await Module.find({ application_id, name })
      res.status(200).json({ [`${name}s`]: modules })
    } catch (e) {
      next(e)
    }
  }
)

router.post(
  '/:id/modules/:name',
  authentication,
  async (
    req: ExtendedRequest<
      {
        id: string
        name: string
      },
      { data: ModuleSchema['data'] }
    >,
    res,
    next
  ) => {
    const {
      params: { id, name },
      body: { data },
    } = req

    try {
      const moduleable = await Moduleable.findOne({ application_id: id, name })
      if (!moduleable) {
        next(new Error(`Unable to find ${name} Module`))
        return
      }

      const moduleCreator = new ModuleCreatorService(moduleable, data)
      const result = moduleCreator.process()

      if (result === null) {
        next('An error occurred when creating ${moduleable.name}')
      } else if (result instanceof Error) {
        next(result)
      } else {
        const module = await result.save()
        res.status(201).json({ [moduleable.name]: module })
      }
    } catch (e) {
      next(e)
    }
  }
)

export default router
