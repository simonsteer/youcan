import { Schema, Document, Model, model } from 'mongoose'
import bcrypt from 'bcrypt'

export interface UserSchema {
  email: string
  username: string
  password: string
}

const schema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

export interface UserDocument extends Document, UserSchema {
  name: string
}

export interface IUser extends UserDocument {
  comparePassword(password: string): boolean
}

schema.virtual('name').get(function(this: UserDocument) {
  return this.username
})

schema.methods.comparePassword = function(
  this: UserDocument,
  password: string
) {
  return bcrypt.compare(password, this.password)
}

schema.pre('save', async function(this: UserDocument, next) {
  const user = this
  if (user.isModified('password') || user.isNew) {
    try {
      user.password = await bcrypt.hash(user.password, 10)
      next()
    } catch (e) {
      next(e)
    }
  }

  next()
})

export interface UserModel extends Model<IUser> {}

const User: UserModel = model<IUser, UserModel>('User', schema)

export default User
