import { baseModel, modelUuid } from './index'

class GraphqlToken extends modelUuid(baseModel) {
  static tableName = 'graphql_tokens'
}

export default GraphqlToken
