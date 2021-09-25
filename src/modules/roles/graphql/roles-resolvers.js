import roleResolver from './resolvers'

export default {
  Query: {
    getRoles: (_, { page, pageSize }) => roleResolver.index({ page, pageSize })
  }
}
