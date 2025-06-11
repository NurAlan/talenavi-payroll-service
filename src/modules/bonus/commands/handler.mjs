import { response } from '../../../helpers/utils/response.mjs'
import Bonus from './domain.mjs'

const bonus = new Bonus()

export const create = async(req, res) => {
  const insertData = await bonus.create(
    req.locals.validated.body,
    req.user.data
  )
  return response(res, {
    message: 'insert bonus successfully',
    data: insertData
  })
}

export const update = async (req, res) => {
  const updateData = await bonus.update(
    {...req.locals.validated.body, ...req.locals.validated.params},
    req.user.data
  )

  return response(res, {
    message: 'update bonus successfully',
    data: updateData
  })
}

export const destroy = async(req, res) => {
  const destroyData = await bonus.destroy(
    req.locals.validated.body,
    req.user.data
  )

  return response(res, {
    message: 'destroy bonus successfully',
    data: destroyData
  })
}

export default {
  create,
  update,
  destroy
}