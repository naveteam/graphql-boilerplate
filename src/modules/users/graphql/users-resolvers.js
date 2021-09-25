import userResolver from './resolvers'

export default {
  Query: {
    getUsers: () => userResolver.index(),
    getUser: (root, { id }) => userResolver.show(id)
  },
  Mutation: {
    createUser: (_, { input }) => userResolver.create({ input }),
    updateUser: (_, { input }) => userResolver.update({ input })
  }
}
