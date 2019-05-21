import multer from 'multer'
import omitBy from 'lodash/omitBy'
import Loki, { Collection } from 'lokijs'

export const db = new Loki('uploads/db.json', { persistenceMethod: 'fs' })

type FileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void
) => void

export const imageFilter: FileFilter = function(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false)
  }
  cb(null, true)
}

export const createUploader = (filter?: FileFilter) =>
  multer(omitBy({ dest: 'uploads', fileFilter: filter }, Boolean))

export const imageUploader = createUploader(imageFilter)

export const loadCollection = (
  collection: string,
  db: Loki
): Promise<Collection<any>> =>
  new Promise(resolve => {
    db.loadDatabase({}, () => {
      const response =
        db.getCollection(collection) || db.addCollection(collection)
      resolve(response)
    })
  })
