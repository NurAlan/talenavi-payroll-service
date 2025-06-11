import db from '../../../models/index.mjs'
import { ForbiddenError, InternalServerError, NotFoundError, UnprocessableEntityError } from '../../../helpers/utils/response.mjs'
import Command from './command.mjs'
import Query from '../queries/query.mjs'
import _ from 'lodash'
import {format, isAfter, set} from 'date-fns'


export default class Attendance {
  constructor () {
    this.command = new Command(db)
    this.query = new Query(db)
  }

  /**
   * 
   * @param { {status: string} } payload 
   * @param { {id: string, name: string, role: string} } user
   * @returns { Promise<boolean> }
   */
  async checkIn(payload, user) {
    if(user.role !== 'employee') {
      throw new ForbiddenError('Access denied')
    }

    const getEmployeId = await this.query.findEmployeeByUserId(user.id)
    if(_.isNil(getEmployeId)) {
      throw new NotFoundError('Data not found')
    }

    const checkIsAttendance = await this.query.findAttendanceById(getEmployeId.id)
    if(!_.isNil(checkIsAttendance)) {
      throw new UnprocessableEntityError('Anda sudah melakukan absensi hari ini')
    }

    const getSetting = await this.query.findSetting()
    if(_.isNil(getSetting)) {
      throw new UnprocessableEntityError('Waktu absensi belum di setting,silahkan hubungi admin')
    }

    const now = new Date()
    if(payload.status == 'hadir') {
      //set date untuk mengecek terlambat atau tidak
      const splitTime = getSetting.clockIn.split(':').map(Number)
      const targetTime = set(new Date(), {
        hours: splitTime[0],
        minutes: splitTime[1],
        seconds: splitTime[2],
        milliseconds: 0
      })

      if( isAfter(now, targetTime) ) {
        payload.status = 'terlambat'
      }
    }

    const dataAttendance = {
      ...payload,
      employeeId: getEmployeId.id,
      date: now,
      time: format(now, 'kk:mm:ss')
    }

    const insertAttendance = await this.command.createAttendance(dataAttendance)
    return insertAttendance
  }
}

