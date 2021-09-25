import { errorHandling } from 'helpers'

export const errorHandlingMiddleware = async (ctx, next) => {
  try {
    if (ctx.request.url.includes('/v1/graphql/playground')) {
      return next()
    }

    ctx.body = await next()
  } catch (err) {
    const errorObject = errorHandling(err)
    ctx.status = errorObject.statusCode
    ctx.body = errorObject
  }
}
