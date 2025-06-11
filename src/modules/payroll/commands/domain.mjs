import db from '../../../models/index.mjs'
import { ForbiddenError, NotFoundError, UnprocessableEntityError} from '../../../helpers/utils/response.mjs'
import Command from './command.mjs'
import Query from '../queries/query.mjs'
import EmployeQuery from '../../employee/queries/query.mjs'
import BonusQuery from '../../bonus/queries/query.mjs'
import _ from 'lodash'
import { getWorkdayDates } from '../../../helpers/utils/workDays.mjs'
import { endOfDay, endOfMonth, format, parseISO, startOfDay, startOfMonth } from 'date-fns'


export default class Payroll {
  constructor () {
    this.command = new Command(db)
    this.query = new Query(db)
    this.employeQuery = new EmployeQuery(db)
    this.bonusQuery = new BonusQuery(db)
  }

  /**
   * 
   * @param { {employeeId: string, month: string} } payload 
   * @param { {id: string, name: string, role: string} } user
   * @returns { Promise<boolean> }
   */
  async create(payload, user) {
    if(user.role !== 'admin') {
      throw new ForbiddenError('Access denied')
    }

    const getEmploye = await this.employeQuery.findEmployeeById(payload.employeeId)
    if(_.isNil(getEmploye)) {
      throw new NotFoundError('Data not found')
    }

    const checkPayroll = await this.query.checkPayrollByIdMonth(payload)
    if(!_.isNil(checkPayroll)) {
      throw new UnprocessableEntityError('payroll is already exists')
    }

    const getBonuses = await this.bonusQuery.sumBonus(payload.employeeId, payload.month)
    const bonus = parseInt(getBonuses[0]?.totalBonus || 0)
    //proses untuk mengambil hari kerja (senin - jumat)
    const getWorkDays = getWorkdayDates(payload.month)

    //proses untuk mengambil data absensi pada 1 bulan
    const getDate = new Date(new Date().getFullYear(), payload.month - 1)
    const filter = {
      employeeId: payload.employeeId,
      startDate: startOfMonth(getDate),
      endDate: endOfMonth(getDate)
    }
    const {rows: data, count: totalData} = await this.query.findAttendance(filter)
    
    //proses menghitung alpha berdasarkan hari yang dia tidak absen karena di dokumen soal ga ada input untuk absen alpha
    //maka aku buat asumsinya hari yang tidak ada absen maka dia dianggap alpha
    const presentDates = data.map(item => format(parseISO(item.date), 'yyyy-MM-dd'))
    const alphaDates = getWorkDays.filter(date => !presentDates.includes(date))

    const deductionPerAbsence = Math.round(getEmploye.baseSalary / 22)
    const netSalary = getEmploye.baseSalary - (alphaDates.length  * deductionPerAbsence) + bonus
    const payrollDocs = {
      calculatedSalary: netSalary, ...payload
    }
  
    const insertPayroll = await this.command.insertPayroll(payrollDocs)
    return insertPayroll
  }
}

