import User from 'models/User'

import { encryptPassword } from 'helpers'

export const index = () => User.query().withGraphFetched('role')

export const show = ({ id }) =>
  User.query().findById(id).withGraphFetched('role')

export const create = async ({ input }) =>
  User.query()
    .insertAndFetch({
      name: input.name,
      email: input.email,
      password: await encryptPassword(input.password),
      birthdate: input.birthdate,
      role_id: input.role.id
    })
    .withGraphFetched('role')

export const update = async ({ input }) =>
  User.query()
    .patchAndFetchById(input.id, {
      name: input.name,
      email: input.email,
      password: await encryptPassword(input.password),
      role_id: input.role.id,
      birthdate: input.birthdate
    })
    .withGraphFetched('role')

export default {
  index,
  show,
  create,
  update
}
