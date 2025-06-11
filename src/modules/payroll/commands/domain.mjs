import db from '../../../models/index.mjs'
import { ForbiddenError, NotFoundError, UnprocessableEntityError} from '../../../helpers/utils/response.mjs'
import Command from './command.mjs'
import Query from '../queries/query.mjs'
import EmployeQuery from '../../employee/queries/query.mjs'
import BonusQuery from '../../bonus/queries/query.mjs'
import _ from 'lodash'
import { formatCurrencyIDR, getWorkdayDates } from '../../../helpers/utils/utils.mjs'
import { endOfDay, endOfMonth, format, parseISO, startOfDay, startOfMonth } from 'date-fns'
import { id } from 'date-fns/locale'
import ExcelJS from 'exceljs'


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
    const filter = {
      employeeId: payload.employeeId,
      startDate: startOfMonth(payload.month),
      endDate: endOfMonth(payload.month)
    }
    const {rows: data, count: totalData} = await this.query.findAttendance(filter)
    
    //proses menghitung alpha berdasarkan hari yang dia tidak absen karena di dokumen soal ga ada input untuk absen alpha
    //maka aku buat asumsinya hari yang tidak ada absen maka dia dianggap alpha
    const presentDates = data.map(item => format(item.date, 'yyyy-MM-dd'))
    const alphaDates = getWorkDays.filter(date => !presentDates.includes(date))

    const deductionPerAbsence = Math.round(getEmploye.baseSalary / 22)
    const netSalary = getEmploye.baseSalary - (alphaDates.length  * deductionPerAbsence) + bonus
    const payrollDocs = {
      calculatedSalary: netSalary, ...payload,
      bonus,
      deduction: alphaDates.length  * deductionPerAbsence,
      baseSalary: getEmploye.baseSalary
    }
  
    const insertPayroll = await this.command.insertPayroll(payrollDocs)
    return insertPayroll
  }

  /**
   * 
   * @param { {startMonth: date, endMonth: date} } payload 
   * @param { {id: string, name: string, role: string} } user
   */
  async download(payload, user) {
    if(user.role !== 'admin') {
      throw new ForbiddenError('Access denied')
    }

    const getPayroll = await this.query.findPayroll(payload)
    const transsformPayroll = getPayroll.map(o => ({
      ..._.pick(o,['id', 'employeId', 'month']),
      deduction: formatCurrencyIDR(o.deduction),
      bonus: formatCurrencyIDR(o.bonus),
      calculatedSalary: formatCurrencyIDR(o.calculatedSalary),
      position: o['Employee.position'],
      name: o['Employee.User.name'],
      role: o['Employee.User.role'],
      baseSalary: formatCurrencyIDR(o['Employee.baseSalary']),
      monthIDN: format(o.month, 'MMMM', {locale: id})
    }))

    return await this.formatToExcel(transsformPayroll)
  }

  /**
   * 
   * @param { [{id: string, month: string, deduction: string, bonus: string, calculatedSalary: string, position: string, name: string, role: string, baseSalary: string, monthIDN: string}] } document 
   */
  async formatToExcel(document) {
    //groupping berdasarkan bulan
    const groupedByMonth = _.groupBy(document, 'monthIDN')

    const workbook = new ExcelJS.Workbook()
    // iterasi untuk membuat bulan per sheet
    for (const [month, items] of Object.entries(groupedByMonth)) {
      const worksheet = workbook.addWorksheet(month)
      //setup header
      worksheet.columns = [
        { header: 'Nama', key: 'name', width: 20 },
        { header: 'Jabatan', key: 'position', width: 20 },
        { header: 'Gaji Pokok', key: 'baseSalary', width: 20 },
        { header: 'Bonus', key: 'bonus', width: 15 },
        { header: 'Potongan', key: 'deduction', width: 15 },
        { header: 'Gaji Bersih', key: 'calculatedSalary', width: 20 },
      ]

      for (const row of items) {
        worksheet.addRow({
          name: row.name,
          position: row.position,
          baseSalary: row.baseSalary,
          bonus: row.bonus,
          deduction: row.deduction,
          calculatedSalary: row.calculatedSalary
        });
      }

      worksheet.getRow(1).font = { bold: true }
    }
    return await workbook.xlsx.writeBuffer()
    
  }
}

