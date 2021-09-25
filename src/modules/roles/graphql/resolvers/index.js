import Role from 'models/Role'

import { getPagination } from 'helpers'

export const index = async ({ ...queryVariables }) => {
  const { page, pageSize, calculatePageCount } = getPagination(queryVariables)

  const roles = await Role.query().page(page, pageSize)

  return {
    results: roles.results,
    page: page + 1,
    pageSize,
    pageCount: calculatePageCount(roles.total)
  }
}

export default {
  index
}
