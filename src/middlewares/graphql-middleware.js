import { NODE_ENV } from 'config'

import typeDefs from '../schemas'
import resolvers from '../resolvers'

import { makeExecutableSchema } from '@graphql-tools/schema'
import { getTokenByQuery } from './auth-middleware'

const executableSchemas = makeExecutableSchema({ resolvers, typeDefs })

export const graphqlSettingsPerRequest = async ctx => {
  getTokenByQuery(ctx.query)

  return {
    graphiql: NODE_ENV !== 'production',
    schema: executableSchemas,
    rootValue: {
      request: ctx.request
    }
  }
}
