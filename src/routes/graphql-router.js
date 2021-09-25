import graphqlController from 'controllers/graphql-controller'

import Router from 'koa-router'

const router = new Router()

router.get('/graphql/tokens', graphqlController.getByUser)

router.post('/graphql/tokens', graphqlController.createToken)

export default router.routes()
