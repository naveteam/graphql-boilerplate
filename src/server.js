import Koa from 'koa'
import Cors from '@koa/cors'
import koaBody from 'koa-body'
import helmet from 'koa-helmet'
import { logger } from 'koa2-winston'
import * as winston from 'winston'
import graphqlHttp from 'koa-graphql'

import routes from 'routes'
import {
  authMiddleware,
  errorHandlingMiddleware,
  graphqlSettingsPerRequest
} from 'middlewares'

import { createCloudwatchTransporter, createTransporterPostgres } from 'helpers'
import { LOGGER_GROUP, LOGGER_STREAM_GENERAL } from './utils'

import typeDefs from './schemas'
import resolvers from './resolvers'

import { makeExecutableSchema } from '@graphql-tools/schema'

const executableSchemas = makeExecutableSchema({ resolvers, typeDefs })

const app = new Koa()

app.use(helmet())

app.use(
  logger({
    transports: [
      createTransporterPostgres(),
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.simple(),
          winston.format.colorize({ all: true })
        )
      })
    ],
    reqKeys: ['header.content-type', 'query', 'body'],
    reqSelect: [],
    reqUnselect: ['header.cookie', 'header.authorization', 'body.password'],
    resKeys: ['status', 'message'],
    resSelect: [],
    resUnselect: ['header']
  })
)

app.use(
  Cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id']
  })
)

app.use(koaBody({ multipart: true }))

routes.all('/v1/graphql/playground', graphqlHttp(graphqlSettingsPerRequest))

app.use(errorHandlingMiddleware)
app.use(authMiddleware)

app.use(routes.routes())
app.use(routes.allowedMethods())

export default app
