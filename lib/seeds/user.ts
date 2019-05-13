import { User } from '../models'

const user1 = new User({
  username: 'simon',
  email: 'user1@euser2.cuser3',
  password: 'password',
})

const user2 = new User({
  username: 'devin',
  password: 'password',
  email: 'devin@gmail.com',
})

const user3 = new User({
  username: 'susan',
  password: 'password',
  email: 'susan@earnwithdrop.com',
})

const seeds = [user1, user2, user3]

export default seeds
