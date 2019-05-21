import { Router, Request } from 'express'
import Application from '../models/application'
import Moduleable, { ModuleableSchema } from '../models/moduleable'
import Module, { ModuleSchema } from '../models/module'
import { authentication } from '../middleware'
import ModuleCreatorService from '../services/moduleCreatorService'
import { ExtendedRequest } from './types'

const router = Router()

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const application = await Application.findById(id)
    res.status(200).json({ application })
  } catch (e) {
    next(e)
  }
})

router.get('/:id/moduleables', authentication, async (req, res, next) => {
  try {
    const moduleables = await Moduleable.find({ application_id: req.params.id })
    if (!moduleables) {
      next(new Error("Couldn't get moduleables"))
      return
    }

    res.status(200).json({ moduleables })
  } catch (e) {
    next(e)
  }
})

router.post(
  '/:id/moduleables',
  authentication,
  async (
    req: ExtendedRequest<
      any,
      {
        name: ModuleableSchema['name']
        fields: ModuleableSchema['fields']
      }
    >,
    res,
    next
  ) => {
    const { name, fields } = req.body

    // TODO: ADD moduleableCreatorService which validates fields
    const IModuleable = new Moduleable({
      application_id: req.params.id,
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
  '/:id/modules/:moduleable_id',
  authentication,
  async (
    req: ExtendedRequest<{
      id: string
      moduleable_id: string
    }>,
    res,
    next
  ) => {
    const { moduleable_id } = req.params
    try {
      const modules = await Module.find({ moduleable_id })
      if (!modules) {
        next(new Error("Couldn't get Modules"))
        return
      }

      res.status(200).json({ modules })
    } catch (e) {
      next(e)
    }
  }
)

router.post(
  '/:id/modules/:moduleable_id',
  authentication,
  async (
    req: ExtendedRequest<
      {
        id: string
        moduleable_id: string
      },
      { data: ModuleSchema['data'] }
    >,
    res,
    next
  ) => {
    const {
      params: { moduleable_id },
      body: { data },
    } = req

    try {
      const moduleable = await Moduleable.findById(moduleable_id)
      if (!moduleable) {
        next(
          new Error(
            `Unable to find module with  moduleable_id: ${moduleable_id}.`
          )
        )
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
