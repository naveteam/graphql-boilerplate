import jwt from 'jsonwebtoken'

import { ACCESS_SECRET } from 'config'
import { v4 as uuidV4 } from 'uuid'

import GraphqlToken from 'models/GraphqlToken'

export const createToken = ctx =>
  GraphqlToken.query().insert({
    user_id: ctx.state.user.id,
    token: jwt.sign(uuidV4(), ACCESS_SECRET)
  })

export const getByUser = ctx =>
  GraphqlToken.query().where({ user_id: ctx.state.user.id }).throwIfNotFound()

export default {
  createToken,
  getByUser
}
