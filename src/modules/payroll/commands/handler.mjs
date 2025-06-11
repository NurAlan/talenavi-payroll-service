import { response } from '../../../helpers/utils/response.mjs'
import Payroll from './domain.mjs'

const payroll = new Payroll()

export const create = async(req, res) => {
  const insertData = await payroll.create(
    req.locals.validated.body,
    req.user.data
  )
  return response(res, {
    message: 'insert payroll successfully',
    data: insertData
  })
}

export const download = async(req, res) => {
  const downloadData = await payroll.download(
    req.locals.validated.body,
    req.user.data
  )
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  res.setHeader('Content-Disposition', 'attachment; filename=laporan-gaji.xlsx')
  res.send(downloadData)
}

export default {
  create,
  download
}