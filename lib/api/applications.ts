import { Router } from 'express'
import Application from '../models/application'
import Moduleable, { ModuleableSchema } from '../models/moduleable'
import Module, { ModuleSchema } from '../models/module'
import { authentication } from '../middleware'
import ModuleCreatorService from '../services/moduleCreatorService'

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

router.post('/:id/moduleables', authentication, async (req, res, next) => {
  interface Params {
    id: number
  }
  const { id } = req.params as Params

  interface Body {
    name: ModuleableSchema['name']
    fields: ModuleableSchema['fields']
  }
  const { name, fields } = req.body as Body

  const IModuleable = new Moduleable({ application_id: id, name, fields })
  try {
    const moduleable = await IModuleable.save()
    res.status(201).json({ moduleable })
  } catch (e) {
    next(e)
  }
})

router.get('/:id/moduleables', authentication, async (req, res, next) => {
  interface Params {
    id: number
  }
  const { id } = req.params as Params

  try {
    const moduleables = await Moduleable.find({ application_id: id })
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
  '/:id/modules/:moduleable_id',
  authentication,
  async (req, res, next) => {
    interface Params {
      id: number
      moduleable_id: string
    }
    const { id, moduleable_id } = req.params as Params

    interface Body {
      data: ModuleSchema['data']
    }
    const { data } = req.body as Body

    try {
      const moduleable = await Moduleable.findById(moduleable_id)
      if (!moduleable) {
        next(new Error(`Unable to find module with id: ${moduleable_id}.`))
        return
      }

      const moduleCreator = new ModuleCreatorService(moduleable, data)
      const moduleDocs = moduleCreator.create()

      if (moduleDocs === null) {
        next('An error occurred when creating ${moduleable.name}')
      } else if (moduleDocs instanceof Error) {
        next(moduleDocs)
      } else {
        const modules = await moduleDocs.save()
        res.status(201).json({ modules })
      }
    } catch (e) {
      next(e)
    }
  }
)

export default router
